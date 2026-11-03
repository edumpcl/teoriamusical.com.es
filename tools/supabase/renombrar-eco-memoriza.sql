-- Memoriza se llamó Eco: pasa la clasificación de 'eco' a 'memoriza' sin perder nada.
-- Se ejecuta UNA vez en el SQL Editor de Supabase, después de publicar el código que usa 'memoriza'.
-- Si alguien juega entre la publicación y esto, se queda la mejor de sus dos marcas (Memoriza: más alta = mejor)
-- y su apodo más reciente. Se puede volver a ejecutar sin problema: la segunda vez no hace nada.
begin;

insert into clasif_marcas (juego, dif, periodo, jugador, marca, actualizado)
  select 'memoriza', dif, periodo, jugador, marca, actualizado from clasif_marcas where juego = 'eco'
on conflict (juego, dif, periodo, jugador) do update
  set marca = greatest(clasif_marcas.marca, excluded.marca),
      actualizado = case when excluded.marca > clasif_marcas.marca then excluded.actualizado else clasif_marcas.actualizado end;
delete from clasif_marcas where juego = 'eco';

insert into clasif_jugadores (juego, jugador, nombre, musico)
  select 'memoriza', jugador, nombre, musico from clasif_jugadores where juego = 'eco'
on conflict (juego, jugador) do nothing;
delete from clasif_jugadores where juego = 'eco';

commit;

-- Comprobación: debe salir 0 en 'eco' y las filas de antes en 'memoriza'.
select juego, count(*) from clasif_marcas where juego in ('eco', 'memoriza') group by juego;
