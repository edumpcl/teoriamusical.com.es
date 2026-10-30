-- Clasificación mundial de los juegos (api/clasificacion.js).
-- Se ejecuta UNA vez en Supabase: SQL Editor -> New query -> pegar todo -> Run.
-- Se puede volver a ejecutar sin perder datos (todo es "if not exists" / "or replace").
--
-- Seguridad: las tablas llevan RLS activado y sin políticas, y las funciones solo las
-- puede ejecutar service_role. Es decir, nadie llega a estos datos con la clave pública
-- (anon) de Supabase: solo la función de Vercel, que usa la clave secreta.

create table if not exists clasif_marcas (
  juego       text        not null,
  dif         text        not null,
  periodo     text        not null,          -- 'siempre' o 'sem:2026-W44'
  jugador     text        not null,          -- identificador anónimo del navegador
  marca       numeric     not null,
  actualizado timestamptz not null default now(),
  primary key (juego, dif, periodo, jugador)
);
create index if not exists clasif_marcas_orden on clasif_marcas (juego, dif, periodo, marca);

create table if not exists clasif_jugadores (
  juego   text not null,
  jugador text not null,
  nombre  text not null,
  musico  text not null default '',
  primary key (juego, jugador)
);

-- permisos ya usados (cada permiso solo vale una vez)
create table if not exists clasif_usados (
  nonce  text primary key,
  creado timestamptz not null default now()
);

-- contadores antiabusos por minuto (la clave es una huella de la IP, nunca la IP)
create table if not exists clasif_limites (
  clave   text primary key,
  ventana bigint not null,
  n       int    not null
);

alter table clasif_marcas    enable row level security;
alter table clasif_jugadores enable row level security;
alter table clasif_usados    enable row level security;
alter table clasif_limites   enable row level security;

-- Permisos explícitos: el proyecto se crea con «Automatically expose new tables»
-- desactivado, así que nadie recibe permisos sobre estas tablas salvo service_role.
revoke all on clasif_marcas, clasif_jugadores, clasif_usados, clasif_limites from anon, authenticated;
grant select, insert, update, delete on clasif_marcas, clasif_jugadores, clasif_usados, clasif_limites to service_role;

-- Suma 1 al contador de esta clave en el minuto actual y devuelve cuántas lleva.
create or replace function clasif_contar(p_clave text) returns int
language sql as $$
  insert into clasif_limites (clave, ventana, n)
  values (p_clave, floor(extract(epoch from now()) / 60)::bigint, 1)
  on conflict (clave) do update
    set n = case when clasif_limites.ventana = excluded.ventana then clasif_limites.n + 1 else 1 end,
        ventana = excluded.ventana
  returning n;
$$;

-- Top y puesto del jugador, de la semana y de siempre.
-- Empates: comparten puesto; en el top va antes quien llegó antes a esa marca.
create or replace function clasif_tabla(p_juego text, p_dif text, p_semana text, p_jugador text, p_orden text, p_top int default 10)
returns jsonb language plpgsql stable as $$
declare
  r jsonb := '{}'; k text; per text; t jsonb; mi numeric; tot int; pos int;
  s int := case when p_orden = 'desc' then -1 else 1 end;
begin
  foreach k in array array['semana', 'siempre'] loop
    per := case when k = 'semana' then 'sem:' || p_semana else 'siempre' end;
    select coalesce(jsonb_agg(jsonb_build_object(
             'n', coalesce(j.nombre, '¿?'), 'm', coalesce(j.musico, ''), 'marca', m.marca, 'yo', m.jugador = p_jugador)
             order by m.marca * s, m.actualizado), '[]'::jsonb)
      into t
      from (select * from clasif_marcas
             where juego = p_juego and dif = p_dif and periodo = per
             order by marca * s, actualizado limit p_top) m
      left join clasif_jugadores j on j.juego = p_juego and j.jugador = m.jugador;
    select count(*) into tot from clasif_marcas where juego = p_juego and dif = p_dif and periodo = per;
    select marca into mi from clasif_marcas where juego = p_juego and dif = p_dif and periodo = per and jugador = p_jugador;
    if mi is null then pos := null;
    else select 1 + count(*) into pos from clasif_marcas
          where juego = p_juego and dif = p_dif and periodo = per and marca * s < mi * s;
    end if;
    r := r || jsonb_build_object(k, jsonb_build_object(
           'top', t, 'marca', mi, 'total', tot,
           'yo', case when pos is null then null else jsonb_build_object('pos', pos, 'total', tot) end));
  end loop;
  return r;
end $$;

-- Consulta pública (GET) con su límite por minuto.
create or replace function clasif_ver(p_juego text, p_dif text, p_semana text, p_jugador text, p_orden text, p_ip text, p_max int)
returns jsonb language plpgsql as $$
begin
  if clasif_contar('c:' || p_ip) > p_max then return jsonb_build_object('error', 'limite'); end if;
  return clasif_tabla(p_juego, p_dif, p_semana, p_jugador, p_orden);
end $$;

-- Publicar una marca. Todo en una transacción: gastar el permiso, contar el envío,
-- guardar la marca solo si mejora la anterior (semana y siempre) y el apodo.
create or replace function clasif_publicar(p_juego text, p_dif text, p_semana text, p_jugador text, p_nombre text,
  p_musico text, p_marca numeric, p_orden text, p_nonce text, p_ip text, p_max int)
returns jsonb language plpgsql as $$
begin
  insert into clasif_usados (nonce) values (p_nonce) on conflict do nothing;
  if not found then return jsonb_build_object('error', 'usado'); end if;
  if clasif_contar('e:' || p_ip) > p_max then return jsonb_build_object('error', 'limite'); end if;

  insert into clasif_marcas (juego, dif, periodo, jugador, marca)
  values (p_juego, p_dif, 'siempre', p_jugador, p_marca), (p_juego, p_dif, 'sem:' || p_semana, p_jugador, p_marca)
  on conflict (juego, dif, periodo, jugador) do update
    set marca = excluded.marca, actualizado = now()
    where case when p_orden = 'desc' then excluded.marca > clasif_marcas.marca
               else excluded.marca < clasif_marcas.marca end;

  insert into clasif_jugadores (juego, jugador, nombre, musico) values (p_juego, p_jugador, p_nombre, p_musico)
  on conflict (juego, jugador) do update set nombre = excluded.nombre, musico = excluded.musico;

  -- limpieza de vez en cuando: semanas viejas, permisos usados y contadores caducados
  if random() < 0.05 then
    delete from clasif_marcas  where periodo like 'sem:%' and actualizado < now() - interval '15 days';
    delete from clasif_usados  where creado < now() - interval '1 day';
    delete from clasif_limites where ventana < floor(extract(epoch from now()) / 60)::bigint - 10;
  end if;

  return clasif_tabla(p_juego, p_dif, p_semana, p_jugador, p_orden) || jsonb_build_object('ok', true);
end $$;

-- Moderación: quita a un jugador de todas las tablas de ese juego.
create or replace function clasif_borrar(p_juego text, p_jugador text) returns int
language plpgsql as $$
declare n int;
begin
  delete from clasif_marcas where juego = p_juego and jugador = p_jugador;
  get diagnostics n = row_count;
  delete from clasif_jugadores where juego = p_juego and jugador = p_jugador;
  return n;
end $$;

-- Solo la clave secreta (service_role) puede ejecutar las funciones.
revoke all on function clasif_contar(text) from public, anon, authenticated;
revoke all on function clasif_tabla(text, text, text, text, text, int) from public, anon, authenticated;
revoke all on function clasif_ver(text, text, text, text, text, text, int) from public, anon, authenticated;
revoke all on function clasif_publicar(text, text, text, text, text, text, numeric, text, text, text, int) from public, anon, authenticated;
revoke all on function clasif_borrar(text, text) from public, anon, authenticated;
grant execute on function clasif_ver(text, text, text, text, text, text, int) to service_role;
grant execute on function clasif_publicar(text, text, text, text, text, text, numeric, text, text, text, int) to service_role;
grant execute on function clasif_borrar(text, text) to service_role;
grant execute on function clasif_tabla(text, text, text, text, text, int) to service_role;
grant execute on function clasif_contar(text) to service_role;
