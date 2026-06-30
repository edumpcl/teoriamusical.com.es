/*
 * FUENTE LEGIBLE del metrónomo (formateada desde metronomo.js, minificado).
 * Mismo comportamiento, solo con saltos de línea e indentación.
 * Generado por tools/beautify-metronomo.cjs. Para desplegar cambios hace falta
 * re-minificar a metronomo.js (p. ej. con terser).
 *
 * ─── LEYENDA DE VARIABLES (los nombres son de 1 letra por la minificación) ───
 * El código se minificó con `mangle`, así que NO hay nombres descriptivos. Este
 * mapa es lo verificado leyendo el código; sirve para orientarse al hacer retoques.
 * OJO: algunas letras se REUTILIZAN como locales dentro de funciones (ver notas).
 *
 * Estado (variables del IIFE, persisten mientras suena):
 *   p   = BPM / tempo (15–300)
 *   v   = subdivisión seleccionada (1–8; data-div de los botones)
 *   E   = compás como texto ("2/4"); en compás libre, "(suma de corcheas)/8"
 *   k   = número de tiempos del compás
 *   x   = grupos del compás LIBRE aplicados, p.ej. [2,3] (vacío = compás normal)
 *   f   = índice del tiempo actual en el planificador.  ⚠ OJO: dentro del bloque de
 *         compás libre hay una `f` LOCAL distinta = array temporal de grupos que
 *         construyen los botones +1/+2/+3 antes de pulsar APLICAR.
 *   g   = contador de compases (para el ciclo del «modo silencio»)
 *   h   = está reproduciendo (play sí/no)
 *   ne  = próximo instante (segundos del AudioContext) que el planificador va a programar
 *   B   = «token» de la sesión de reproducción (cancela timeouts obsoletos al re-arrancar).
 *         ⚠ OJO: en el bloque de compás libre, `B` LOCAL = el elemento #free-groups-display.
 *   C   = AudioContext ;  q = ganancia maestra (master gain)
 *   R   = volumen del click (0–1) ;  N = volumen del acento (0–1)
 *   H   = sonido ("templeblock","claves","cencerro","clasico","electronico","digital")
 *   D   = caja de ritmos activada (sí/no)
 *   K   = instrumentos de batería ["KICK","SNARE","HH-C","HH-O"]
 *   P   = pasos del patrón de batería (16) ;  O = parrilla de la caja de ritmos ;  F = volúmenes de cada instrumento
 *   T   = wakeLock (mantener la pantalla encendida)
 *   ciOn / ciLeft / ciK    = cuenta atrás (count-in)
 *   gpOn / gpPlay / gpMute = «modo silencio» (toca gpPlay compases, silencia gpMute)
 *   G   = valores iniciales leídos de la URL (?bpm=…&meter=…) o de localStorage
 *
 * Locales habituales del planificador ce():
 *   t = segundos por tiempo (60/p) ;  n = t/2 (≈ una corchea) ;  o = duración del tiempo actual
 *   s = nº de clics que suenan en el tiempo (la subdivisión) ;  a = índice del tiempo
 *   LAT = latencia de salida ;  LOOK = ventana de anticipación del planificador
 *   ⚠ Las letras e, t, n, a, o… se reutilizan como locales en muchas funciones: no asumas
 *      que una letra significa lo mismo en todas partes; míralo en su ámbito.
 *
 * Funciones clave (nombres minificados, verificadas):
 *   oe(bpm) = fijar BPM ;  ce() = PLANIFICADOR (programa los clics por adelantado)
 *   se() = play ;  le() = stop ;  Y() = reprogramar tras un cambio
 *   w()  = pintar los grupos del compás libre en pantalla
 * ─────────────────────────────────────────────────────────────────────────────
 */
!function(){
  let e,
  t,
  n,
  a,
  o,
  c,
  s,
  l,
  i,
  r,
  d,
  u,
  m=!1,
  p=120,
  h=!1,
  f=0,
  g=0,
  y=0,
  v=1,
  E="2/4",
  k=2,
  b=[],
  L=!1,
  A=0,
  B=0,
  I=1,
  w=[],
  x=[],
  T=null;
  let ciOn=!1,
  ciLeft=0,
  ciK=0,
  gpOn=!1,
  gpPlay=2,
  gpMute=2;
  function ciShow(n){
    const o=document.getElementById("countin-overlay");
    o&&(n>0?(o.textContent=n,o.hidden=!1):o.hidden=!0)
  }function gpUpdate(sil){
    const s=document.getElementById("gap-status"),
    pb=document.querySelector(".pendulum-box"),
    on=h&&gpOn;
    pb&&pb.classList.toggle("is-silent",on&&!!sil),
    s&&(s.textContent=on?sil?"🔇 Silencio":"🔊 Sonando":"—")
  }async function S(){
    if("wakeLock"in navigator)try{
      T=await navigator.wakeLock.request("screen"),
      T.addEventListener("release",()=>{
        h&&S()
      })
    }catch(e){
    }
  }let C=null,
  M=null,
  q=null,
  V=null,
  R=.8,
  N=1,
  H="templeblock",
  D=!1;
  const K=["KICK","SNARE","HH-C","HH-O"];
  let P=16,
  O=K.map(()=>new Array(P).fill(!1)),
  F=[.8,.7,.6,.5];
  const G={
    "2/4":[{
      name:"Básico",kick:[1,0,0,0,0,0,0,0],snare:[0,0,0,0,1,0,0,0],hhc:[1,0,1,0,1,0,1,0],hho:[0,0,0,0,0,0,0,0]
    },{
      name:"Marcha",kick:[1,0,0,0,1,0,0,0],snare:[0,0,0,0,1,0,0,0],hhc:[1,0,1,0,1,0,1,0],hho:[0,0,0,0,0,0,0,0]
    },{
      name:"Polka",kick:[1,0,1,0,0,0,1,0],snare:[0,0,0,0,1,0,0,0],hhc:[1,1,1,1,1,1,1,1],hho:[0,0,0,0,0,0,0,1]
    }],
    "3/4":[{
      name:"Básico",kick:[1,0,0,0,0,0,0,0,0,0,0,0],snare:[0,0,0,0,1,0,0,0,1,0,0,0],hhc:[1,0,1,0,1,0,1,0,1,0,1,0],hho:[0,0,0,0,0,0,0,0,0,0,0,0]
    },{
      name:"Vals",kick:[1,0,0,0,0,0,0,0,0,0,0,0],snare:[0,0,0,0,1,0,0,0,1,0,0,0],hhc:[1,0,1,0,1,0,1,0,1,0,1,0],hho:[0,0,0,0,0,0,0,0,0,0,0,0]
    },{
      name:"Bolero",kick:[1,0,0,0,1,0,0,0,0,0,1,0],snare:[0,0,1,0,0,0,0,0,1,0,0,0],hhc:[1,0,1,0,1,0,1,0,1,0,1,0],hho:[0,0,0,0,0,0,0,1,0,0,0,0]
    },{
      name:"Mazurca",kick:[1,0,0,0,0,0,1,0,0,0,1,0],snare:[0,0,0,0,1,0,0,0,0,0,0,0],hhc:[1,0,1,0,1,0,1,0,1,0,1,0],hho:[0,0,0,0,0,0,0,0,0,1,0,0]
    }],
    "4/4":[{
      name:"Básico",kick:[1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],snare:[0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],hhc:[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],hho:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    },{
      name:"Rock",kick:[1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],snare:[0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],hhc:[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],hho:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]
    },{
      name:"Pop",kick:[1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],snare:[0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],hhc:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],hho:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0]
    },{
      name:"Funk",kick:[1,0,0,1,0,0,1,0,0,0,0,1,0,0,0,0],snare:[0,0,0,0,1,0,0,1,0,0,1,0,0,0,1,0],hhc:[1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1],hho:[0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0]
    },{
      name:"Bossa",kick:[1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],snare:[0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0],hhc:[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],hho:[0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1]
    },{
      name:"Reggae",kick:[1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],snare:[0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0],hhc:[0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0],hho:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    },{
      name:"Shuffle",kick:[1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],snare:[0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],hhc:[1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1],hho:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    }],
    "9/8":[{
      name:"Básico",kick:[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],snare:[0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0],hhc:[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],hho:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    }],
    "6/8":[{
      name:"Básico",kick:[1,0,0,0,0,0,0,0,0,0,0,0],snare:[0,0,0,0,0,0,1,0,0,0,0,0],hhc:[1,0,1,0,1,0,1,0,1,0,1,0],hho:[0,0,0,0,0,0,0,0,0,0,0,0]
    },{
      name:"Balada",kick:[1,0,0,0,0,0,1,0,0,0,0,0],snare:[0,0,0,1,0,0,0,0,0,1,0,0],hhc:[1,0,1,0,1,0,1,0,1,0,1,0],hho:[0,0,0,0,0,0,0,0,0,0,0,0]
    },{
      name:"Jig",kick:[1,0,0,1,0,0,1,0,0,1,0,0],snare:[0,0,1,0,0,1,0,0,1,0,0,1],hhc:[1,1,1,1,1,1,1,1,1,1,1,1],hho:[0,0,0,0,0,0,0,0,0,0,0,0]
    },{
      name:"Siciliana",kick:[1,0,0,0,1,0,1,0,0,0,1,0],snare:[0,0,1,0,0,0,0,0,1,0,0,0],hhc:[1,0,1,1,0,1,1,0,1,1,0,1],hho:[0,0,0,0,0,0,0,0,0,0,0,0]
    }]
  };
  let $=-1,
  z=[];
  const U=[[15,39,"Grave"],[40,59,"Largo"],[60,65,"Larghetto"],[66,75,"Adagio"],[76,89,"Andante"],[90,104,"Moderato"],[105,114,"Allegretto"],[115,129,"Allegro"],[130,167,"Vivace"],[168,199,"Presto"],[200,300,"Prestissimo"]];
  const j={
    "3/8":1,
    "6/8":2,
    "9/8":3,
    "12/8":4,
    "15/8":5
  };
  function W(e){
    return e in j
  }function saveCfg(){
    if(!m)return;
    try{
      localStorage.setItem("tm_metro_v1",JSON.stringify({
        bpm:p,meter:E,subdiv:v,sound:H,groups:x,vc:Math.round(100*R),va:Math.round(100*N),ci:ciOn,gp:gpOn,gpp:gpPlay,gpm:gpMute
      }))
    }catch(e){
    }
  }function Y(){
    if(!m)return;
    saveCfg();
    const e=new URLSearchParams;
    120!==p&&e.set("bpm",p),
    "2/4"!==E&&e.set("meter",E),
    1!==v&&e.set("subdiv",v),
    "templeblock"!==H&&e.set("sound",H),
    x.length>0&&e.set("groups",x.join("-"));
    const t=e.toString();
    history.replaceState(null,"",location.pathname+(t?"?"+t:""))
  }function J(){
    return C||(C=new(window.AudioContext||window.webkitAudioContext)({latencyHint:.2}),M=C.createDynamicsCompressor(),M.threshold.value=-2,M.knee.value=0,M.ratio.value=12,M.attack.value=.001,M.release.value=.12,q=C.createGain(),q.gain.value=1,M.connect(q),q.connect(C.destination),function(){try{const e=C.createBuffer(1,1,C.sampleRate),t=C.createBufferSource();t.buffer=e,t.connect(C.destination),t.start(0)}catch(e){}}(),C.addEventListener("statechange",()=>{
      h&&"running"!==C.state&&C.resume().catch(()=>{})
    })),
    "suspended"===C.state&&C.resume(),
    C
  }function Q(){
    if(V)return V;
    const e=Math.floor(.15*C.sampleRate);
    V=C.createBuffer(1,e,C.sampleRate);
    const t=V.getChannelData(0);
    for(let n=0;
    n<e;
    n++)t[n]=2*Math.random()-1;
    return V
  }function X(e,t,n,a){
    const _sub=t;let o=.9*(e?N:a?.85*R:t?.45*R:R);
    if(CL[H]){
      const m=CL[H],r=e?m.f:a?m.m:m.d,b=cb[r[0]];
      if(b){
        const s=C.createBufferSource();
        s.buffer=b,
        s.playbackRate.value=r[1];
        const g=C.createGain();
        g.gain.setValueAtTime(1.1*o,n),
        _sub&&g.gain.exponentialRampToValueAtTime(.001,n+.06),
        s.connect(g),
        g.connect(M),
        s.start(n);
        return
      }
    }
    "digital"===H?function(e,t,n,a,o){
      const c=e?2400:t?900:n?1800:1600,
      s=e?.12:t?.025:.06,
      l=C.createOscillator();
      l.type="sine",
      l.frequency.setValueAtTime(c,a);
      const i=C.createGain();
      i.gain.setValueAtTime(0,a),
      i.gain.linearRampToValueAtTime(o,a+5e-4),
      i.gain.exponentialRampToValueAtTime(.001,a+s),
      l.connect(i),
      i.connect(M),
      l.start(a),
      l.stop(a+s+.01)
    }(e,t,a,n,o):"electronico"===H?function(e,t,n,a,o){
      const c=e?1900:t?900:n?1650:1400,
      s=t?.015:e?.07:.05,
      l=C.createBufferSource();
      l.buffer=Q();
      const i=C.createBiquadFilter();
      i.type="highpass",
      i.frequency.setValueAtTime(e?5e3:3500,a);
      const r=C.createGain();
      r.gain.setValueAtTime(.8*o,a),
      r.gain.exponentialRampToValueAtTime(.001,a+.004),
      l.connect(i),
      i.connect(r),
      r.connect(M),
      l.start(a),
      l.stop(a+.006);
      const d=C.createOscillator();
      d.type="sine",
      d.frequency.setValueAtTime(c,a);
      const u=C.createGain();
      u.gain.setValueAtTime(0,a),
      u.gain.linearRampToValueAtTime(1.1*o,a+.001),
      u.gain.exponentialRampToValueAtTime(.001,a+s),
      d.connect(u),
      u.connect(M),
      d.start(a),
      d.stop(a+s+.01)
    }(e,t,a,n,o):function(e,t,n,a,o){
      const c=e?3e3:t?1800:n?2550:2200,
      s=t?.014:e?.042:.028,
      l=C.createBufferSource();
      l.buffer=Q();
      const i=C.createBiquadFilter();
      i.type="highpass",
      i.frequency.setValueAtTime(4e3,a);
      const r=C.createGain();
      r.gain.setValueAtTime(o*(t?.4:.9),a),
      r.gain.exponentialRampToValueAtTime(.001,a+.004),
      l.connect(i),
      i.connect(r),
      r.connect(M),
      l.start(a),
      l.stop(a+.006);
      const d=C.createOscillator();
      d.type="sine",
      d.frequency.setValueAtTime(c,a),
      d.frequency.exponentialRampToValueAtTime(.45*c,a+s);
      const u=C.createGain();
      u.gain.setValueAtTime(o*(t?.4:1.1),a),
      u.gain.exponentialRampToValueAtTime(.001,a+s),
      d.connect(u),
      u.connect(M),
      d.start(a),
      d.stop(a+s+.01)
    }(e,t,a,n,o)
  }const Z=[["/assets/audio/drums/36-Ludwig-26-Kick-1.wav","/assets/audio/drums/36-Ludwig-26-Kick-2.wav","/assets/audio/drums/36-Ludwig-26-Kick-3.wav"],["/assets/audio/drums/38-Ludwig-14-Snare-1.wav","/assets/audio/drums/38-Ludwig-14-Snare-2.wav","/assets/audio/drums/38-Ludwig-14-Snare-3.wav"],["/assets/audio/drums/42-Sabian-13-HatClosed-1.wav","/assets/audio/drums/42-Sabian-13-HatClosed-2.wav","/assets/audio/drums/42-Sabian-13-HatClosed-3.wav"],["/assets/audio/drums/48-Sabian-13-HatSwish-1.wav","/assets/audio/drums/48-Sabian-13-HatSwish-2.wav","/assets/audio/drums/48-Sabian-13-HatSwish-3.wav"]],
  _=Z.map(e=>e.map(()=>null));
  let ee=!1;
  const CL={
    templeblock:{f:["templeblock5.wav",1],m:["templeblock4.wav",1],d:["templeblock1.wav",1]},
    claves:{f:["claves.wav",1.15],m:["claves.wav",1],d:["claves.wav",.85]},
    cencerro:{f:["cencerro1.wav",1],m:["cencerro2.wav",1],d:["cencerro2.wav",.85]}
  },cb={},cbB={};
  let cbLoaded=!1,cbPF=!1;
  function clkUrls(){
    const t=new Set();
    return Object.values(CL).forEach(o=>{t.add(o.f[0]),t.add(o.m[0]),t.add(o.d[0])}),[...t]
  }
  function pf(){
    cbPF||(cbPF=!0,clkUrls().forEach(u=>fetch("/assets/audio/click/"+u).then(e=>e.arrayBuffer()).then(e=>{cbB[u]=e}).catch(()=>{})))
  }
  async function lc(){
    if(cbLoaded)return;
    const e=J();
    await Promise.all(clkUrls().map(async u=>{
      try{
        const t=cbB[u]||await fetch("/assets/audio/click/"+u).then(e=>e.arrayBuffer());
        cb[u]=await e.decodeAudioData(t.slice(0))
      }catch(e){
      }
    })),
    cbLoaded=!0
  }
  function te(e,t,n){
    const a=J(),
    o=a.createGain();
    o.connect(M),
    o.gain.setValueAtTime(t,n);
    const c=_[e],
    s=c.filter(Boolean);
    if(ee&&s.length>0){
      const l=c[t<.4?0:t<.75?1:2]||s[0],
      i=a.createBufferSource();
      i.buffer=l,
      i.connect(o),
      i.start(n);
      const r=0===e?.45:1===e?.35:.2;
      return o.gain.setValueAtTime(t,n),
      o.gain.setValueAtTime(t,n+.6*r),
      void o.gain.exponentialRampToValueAtTime(.001,n+r)
    }if(0===e){
      const e=a.createOscillator();
      e.connect(o),
      e.frequency.setValueAtTime(150,n),
      e.frequency.exponentialRampToValueAtTime(45,n+.15),
      o.gain.exponentialRampToValueAtTime(.001,n+.3),
      e.start(n),
      e.stop(n+.35)
    }else{
      const t=a.createBufferSource(),
      c=a.createBuffer(1,.1*a.sampleRate,a.sampleRate),
      s=c.getChannelData(0);
      for(let e=0;
      e<s.length;
      e++)s[e]=2*Math.random()-1;
      t.buffer=c;
      const l=a.createBiquadFilter();
      l.type="bandpass",
      l.frequency.value=2===e?8e3:6e3,
      t.connect(l),
      l.connect(o),
      o.gain.exponentialRampToValueAtTime(.001,n+.1),
      t.start(n),
      t.stop(n+.15)
    }
  }let ne=0,
  ae=null;
  function oe(e){
    p=Math.max(15,Math.min(300,e)),
    pe(),
    Y()
  }function ce(){
    if(!C)return;
    const e=C.currentTime,
    t=60/p,
    n=t/2,
    LAT=C.outputLatency||C.baseLatency||0,
    LOOK=document.hidden?2.5:.5;
    ne<e&&(ne=e+.04);
    for(;
    ne<e+LOOK;
    ){
      if(ciLeft>0){
        const cb=ciK-ciLeft,
        u2=B,
        d2=Math.max(0,1e3*(ne-e+LAT)),
        sn=cb+1;
        X(0===cb,!1,ne,!1),
        setTimeout(()=>{
          u2===B&&(ue(cb),ciShow(sn))
        },d2),
        1===ciLeft&&setTimeout(()=>{
          u2===B&&ciShow(0)
        },d2+900*t),
        ciLeft--,
        ne+=t;
        continue
      }const a=f,
      o=x.length>0?x[a]*n:t,
      c=fe[a]||"weak";
      const gpCyc=gpPlay+gpMute,
      gpSil=gpOn&&gpCyc>0&&g%gpCyc>=gpPlay;
      if(gpOn){
        const u3=B,
        d3=Math.max(0,1e3*(ne-e+LAT)),
        sl=gpSil;
        setTimeout(()=>{
          u3===B&&gpUpdate(sl)
        },d3)
      }(gpSil||"muted"===c)||X("strong"===c,!1,ne,"medium"===c);
      const s=x.length>0?(1===v?1:x[a]*(v/2)):v;
      if(s>1&&!gpSil){
        const e=o/s;
        for(let t=1;
        t<s;
        t++){
          X(!1,!0,ne+t*e)
        }
      }if(D&&!gpSil){
        const e=x.length>0?2*x[a]:P/k,
        t=x.length>0?2*x.slice(0,a).reduce((e,t)=>e+t,0):a*(P/k)%P,
        n=o/e;
        for(let a=0;
        a<e;
        a++){
          const e=(t+a)%P,
          o=ne+a*n;
          K.forEach((t,n)=>{
            O[n][e]&&te(n,.9*F[n],o)
          })
        }
      }const l=a,
      i=ne,
      d=Math.max(0,1e3*(i-e+LAT)),
      u=B,
      m=D?x.length>0?2*x.slice(0,a).reduce((e,t)=>e+t,0):a*(P/k)%P:-1;
      if(setTimeout(()=>{
        B===u&&(ue(l),y++,me(l),D&&m>=0&&(document.querySelectorAll(".dr-step").forEach(e=>e.classList.remove("playing")),document.querySelectorAll(`.dr-step[data-step="${m}"]`).forEach(e=>e.classList.add("playing"))))
      },d),f=(f+1)%k,0===f&&g++,L){
        const e=parseInt(document.getElementById("prac-measures").value)||8,
        t=parseInt(document.getElementById("prac-bpm-start").value)||60,
        n=parseInt(document.getElementById("prac-bpm-end").value)||120;
        A=Math.min(g/e,1);
        const a=Math.round(t+(n-t)*A);
        a!==p&&oe(a),
        setTimeout(()=>{
          r&&(r.style.width=100*A+"%")
        },d),
        g>=e&&0===f&&setTimeout(()=>{
          B===u&&le()
        },d+100)
      }ne+=o
    }
  }async function se(){
    J(),
    ee||async function(){
      const e=J(),
      t=Z.map((t,n)=>Promise.all(t.map((t,a)=>fetch(t).then(e=>e.arrayBuffer()).then(t=>e.decodeAudioData(t)).then(e=>{
        _[n][a]=e
      }).catch(()=>{
      }))));
      await Promise.all(t),
      ee=!0
    }(),
    cbLoaded||await lc(),
    h=!0,
    q&&(q.gain.cancelScheduledValues(C.currentTime),q.gain.setValueAtTime(1,C.currentTime)),
    tmPracStart(),
    S(),
    f=0,
    L||(g=0),
    ciK=k,
    ciLeft=ciOn?k:0,
    ne=C.currentTime+.05,
    B++,
    ae=setInterval(ce,20),
    he(),
    function(){
      re&&cancelAnimationFrame(re);
      function e(t){
        if(!h)return;
        const n=60/p*1e3;
        de||(de=t);
        const a=(t-de)%(2*n),
        o=28*Math.sin(a/(2*n)*Math.PI*2);
        d&&(d.style.transform=`rotate(${o}deg)`),
        re=requestAnimationFrame(e)
      }de=null,
      re=requestAnimationFrame(e)
    }()
  }function le(){
    tmPracStop(),
    h=!1,
    C&&q&&(q.gain.cancelScheduledValues(C.currentTime),q.gain.setValueAtTime(q.gain.value,C.currentTime),q.gain.linearRampToValueAtTime(0,C.currentTime+.03)),
    T&&(T.release(),T=null),
    B++,
    clearInterval(ae),
    ae=null,
    ciLeft=0,
    ciShow(0),
    gpUpdate(!1),
    function(){
      re&&(cancelAnimationFrame(re),re=null);
      de=null,
      d&&(d.style.transform="rotate(0deg)");
      I=1
    }(),
    he(),
    document.querySelectorAll(".beat-dot").forEach(e=>e.classList.remove("active")),
    me(null)
  }function ie(){
    h?le():se()
  }let re=null,
  de=null;
  function ue(t){
    document.querySelectorAll(".beat-dot").forEach((e,n)=>e.classList.toggle("active",n===t)),
    e&&(e.classList.remove("beat-flash"),requestAnimationFrame(()=>requestAnimationFrame(()=>e.classList.add("beat-flash"))))
  }function me(e){
    o&&(o.textContent=null!==e?e+1:"—"),
    c&&(c.textContent=null!==e?g+1:"—"),
    s&&(s.textContent=h?Math.round(6e4/p):"—"),
    l&&(l.textContent=y)
  }function pe(){
    e&&(e.textContent=p),
    t&&(t.textContent=function(e){
      for(const[t,n,a]of U)if(e>=t&&e<=n)return a;
      return""
    }(p)),
    n&&(n.value=p)
  }function he(){
    i&&(i.innerHTML=h?'<rect x="5" y="4" width="4" height="16" rx="1" fill="#fff"/><rect x="15" y="4" width="4" height="16" rx="1" fill="#fff"/>':'<polygon points="5,3 19,12 5,21" fill="#fff"/>')
  }let fe=[];
  const ge=["strong","medium","weak","muted"],
  ye={
    strong:"Fuerte",
    medium:"Medio",
    weak:"Débil",
    muted:"Silencio"
  };
  function ve(){
    const e=a;
    if(e){
      var t;
      fe.length!==k&&(t=k,fe=Array.from({
        length:t
      },(e,t)=>0===t?"strong":4===k&&2===t?"medium":"weak")),
      e.innerHTML="",
      e.style.paddingBottom="0";
      for(let t=0;
      t<k;
      t++){
        const n=document.createElement("div");
        n.className="beat-dot-wrap";
        const a=document.createElement("div");
        a.className="beat-dot",
        a.dataset.beat=t,
        a.dataset.accent=fe[t];
        const o=document.createElement("div");
        o.className="beat-dot-num",
        o.textContent=t+1;
        const c=document.createElement("div");
        c.className="dot-accent-label",
        c.textContent=ye[fe[t]],
        a.appendChild(o),
        a.appendChild(c),
        n.appendChild(a),
        n.addEventListener("click",()=>{
          const e=ge.indexOf(fe[t]);
          fe[t]=ge[(e+1)%ge.length],a.dataset.accent=fe[t],c.textContent=ye[fe[t]]
        }),
        e.appendChild(n)
      }
    }
  }function Ee(e){
    x=[],
    E=e,
    k=function(e){
      if(W(e))return j[e];
      const[t]=e.split("/").map(Number);
      return t
    }(e),
    b=b.filter(e=>e<k),
    ve(),
    document.querySelectorAll(".meter-pill").forEach(t=>{
      t.classList.toggle("active",t.dataset.meter===e)
    }),
    Ie(e),
    h&&(le(),se()),
    Y()
  }let ke=null;
  function be(){
    const e=performance.now();
    if(w.length>0&&e-w[w.length-1]>2e3&&(w=[]),clearTimeout(ke),ke=setTimeout(()=>{
      w=[]
    },2e3),w.push(e),w.length>5&&w.shift(),w.length>=2){
      const e=[];
      for(let t=1;
      t<w.length;
      t++)e.push(w[t]-w[t-1]);
      const t=e.reduce((e,t)=>e+t,0)/e.length;
      oe(Math.round(6e4/t)),
      h&&(le(),se())
    }
  }function Le(){
    const e=document.getElementById("dr-patterns");
    if(!e)return;
    e.innerHTML="";
    const t=document.createElement("span");
    t.className="pill"+(-1===$?" active":""),
    t.textContent="Off",
    t.addEventListener("click",()=>Be(-1)),
    e.appendChild(t),
    z.forEach((t,n)=>{
      const a=document.createElement("span");
      a.className="pill"+($===n?" active":""),a.textContent=t.name,a.addEventListener("click",()=>Be(n)),e.appendChild(a)
    });
    const n=document.createElement("span"),
    a=z.length;
    n.className="pill"+($===a?" active":""),
    n.textContent="Custom",
    n.addEventListener("click",()=>Be(a)),
    e.appendChild(n)
  }function Ae(){
    const e=document.getElementById("dr-instruments");
    e&&(e.innerHTML="",K.forEach((t,n)=>{
      const a=document.createElement("div");
      a.className="dr-row";
      const o=document.createElement("span");
      o.className="dr-inst-label",o.textContent=t,a.appendChild(o);
      const c=document.createElement("div");
      c.className="dr-steps";
      for(let e=0;
      e<P;
      e++){
        const a=document.createElement("div");
        a.className="dr-step inst-"+t.toLowerCase().replace("-","")+(O[n][e]?" on":""),a.dataset.inst=n,a.dataset.step=e,a.addEventListener("click",()=>{
          O[n][e]=!O[n][e],a.classList.toggle("on",O[n][e]);
          const t=z.length;
          $!==t&&Be(t,!1)
        }),c.appendChild(a)
      }a.appendChild(c);
      const s=document.createElement("input");
      s.type="range",s.className="dr-vol-slider",s.min=0,s.max=100,s.value=Math.round(100*F[n]),s.setAttribute("aria-label","Volumen "+t),s.addEventListener("input",()=>{
        F[n]=s.value/100
      }),a.appendChild(s),e.appendChild(a)
    }))
  }function Be(e,t=!0){
    var n;
    $=e,
    D=-1!==e,
    -1===e?O=K.map(()=>new Array(P).fill(!1)):e<z.length&&(n=z[e],O=[n.kick,n.snare,n.hhc,n.hho].map(e=>Array.from({
      length:P
    },(t,n)=>Boolean(e[n%e.length])))),
    Le(),
    t&&Ae()
  }function Ie(e){
    P=function(e){
      return e.endsWith("/8")?2*parseInt(e):4*parseInt(e)
    }(e),
    z=function(e){
      return G[e]?G[e]:"1/4"===e?G["2/4"]:"5/4"===e||"7/4"===e?G["4/4"]:"3/8"===e||"12/8"===e||"15/8"===e?G["6/8"]:G["4/4"]
    }(e),
    $=-1,
    D=!1,
    O=K.map(()=>new Array(P).fill(!1)),
    Le(),
    Ae()
  }function we(e,t){
    e.addEventListener("click",()=>{
      oe(p+t)
    })
  }/* ── Tiempo de práctica: registra en localStorage los segundos con el metrónomo en marcha ── */let tmPracSince=null,
  tmPracTimer=null;
  const TM_PRAC_KEY="tm_metro_stats_v1";
  function tmPracDayKey(d){
    return d.getFullYear()+"-"+("0"+(d.getMonth()+1)).slice(-2)+"-"+("0"+d.getDate()).slice(-2)
  }function tmPracLoad(){
    try{
      const e=JSON.parse(localStorage.getItem(TM_PRAC_KEY)||"{}");
      return e&&"object"==typeof e?e:{
      }
    }catch(e){
      return{
      }
    }
  }function tmPracSave(e){
    try{
      const t=tmPracDayKey(new Date(Date.now()-7776e6));
      for(const n in e)(n<t||!(e[n]>0))&&delete e[n];
      localStorage.setItem(TM_PRAC_KEY,JSON.stringify(e))
    }catch(e){
    }
  }function tmPracWeekSec(e){
    const t=new Date,
    n=(t.getDay()+6)%7,
    a=new Date(t.getFullYear(),t.getMonth(),t.getDate()-n);
    let o=0;
    for(let t=0;
    t<7;
    t++){
      const n=new Date(a.getFullYear(),a.getMonth(),a.getDate()+t);
      o+=e[tmPracDayKey(n)]||0
    }return o
  }function tmPracFmt(e){
    const t=Math.round(e/60);
    return t<1?"0 min":t<60?t+" min":Math.floor(t/60)+" h "+t%60+" min"
  }function tmPracAccrue(){
    if(null==tmPracSince)return;
    const e=Date.now(),
    t=(e-tmPracSince)/1e3;
    if(tmPracSince=e,!(t>0))return;
    const n=tmPracLoad(),
    a=tmPracDayKey(new Date);
    n[a]=(n[a]||0)+t,
    tmPracSave(n),
    tmPracRender()
  }function tmPracStart(){
    tmPracSince=Date.now(),
    tmPracTimer||(tmPracTimer=setInterval(tmPracAccrue,5e3))
  }function tmPracStop(){
    tmPracAccrue(),
    tmPracSince=null,
    tmPracTimer&&(clearInterval(tmPracTimer),tmPracTimer=null)
  }function tmPracRender(){
    const e=tmPracLoad(),
    t=null!=tmPracSince?(Date.now()-tmPracSince)/1e3:0,
    n=(e[tmPracDayKey(new Date)]||0)+t,
    a=tmPracWeekSec(e)+t,
    o=document.getElementById("prac-today"),
    c=document.getElementById("prac-week");
    o&&(o.textContent=tmPracFmt(n)),
    c&&(c.textContent=tmPracFmt(a))
  }function tmPracInit(){
    const e=document.getElementById("prac-stats-reset");
    e&&e.addEventListener("click",()=>{
      tmPracSince=tmPracTimer?Date.now():null;
      try{
        localStorage.removeItem(TM_PRAC_KEY)
      }catch(e){
      }tmPracRender()
    }),
    document.addEventListener("visibilitychange",()=>{
      document.hidden&&tmPracAccrue()
    }),
    window.addEventListener("pagehide",tmPracAccrue),
    tmPracRender()
  }function xe(){
    e=document.getElementById("bpm-num"),
    t=document.getElementById("tempo-name"),
    n=document.getElementById("bpm-slider"),
    a=document.getElementById("beat-dots"),
    o=document.getElementById("st-beat"),
    c=document.getElementById("st-measure"),
    s=document.getElementById("st-ms"),
    l=document.getElementById("st-total"),
    i=document.getElementById("play-icon"),
    r=document.getElementById("prac-bar"),
    d=document.getElementById("pendulum-g"),
    u=document.getElementById("pend-ball"),
    n.addEventListener("input",()=>{
      oe(parseInt(n.value))
    }),
    we(document.getElementById("btn-minus"),-1),
    we(document.getElementById("btn-plus"),1),
    document.getElementById("btn-play").addEventListener("click",ie),
    document.getElementById("btn-tap").addEventListener("click",be),
    document.getElementById("btn-reset").addEventListener("click",()=>{
      le(),p=120,oe(120),g=0,y=0,I=1,me(null)
    }),
    document.querySelectorAll(".meter-pill").forEach(e=>{
      e.addEventListener("click",()=>Ee(e.dataset.meter))
    });
    let f=[];
    const B=document.getElementById("free-groups-display");
    function w(){
      if(0===f.length)return void(B.innerHTML="<span style=\"font-family:'DM Mono',monospace;font-size:11px;color:var(--muted);\">Sin grupos</span>");
      const e=f.reduce((e,t)=>e+t,0);
      B.innerHTML=f.map((e,t)=>`<span style="\n          padding:4px 10px;\n          border-radius:6px;\n          background:var(--bg3);\n          border:1px solid ${1===e?"var(--muted)":2===e?"var(--blue)":"var(--orange)"};\n          font-family:'DM Mono',monospace;\n          font-size:13px;\n          color:${1===e?"var(--muted)":2===e?"var(--blue)":"var(--orange)"};\n        ">${e}</span>${t<f.length-1?'<span style="color:var(--muted);font-family:DM Mono,monospace;font-size:12px;">+</span>':""}`).join("")+`<span style="font-family:'DM Mono',monospace;font-size:11px;color:var(--muted);margin-left:8px;">(${e}/8)</span>`
    }document.getElementById("free-add1").addEventListener("click",()=>{
      f.push(1),w()
    }),
    document.getElementById("free-add2").addEventListener("click",()=>{
      f.push(2),w()
    }),
    document.getElementById("free-add3").addEventListener("click",()=>{
      f.push(3),w()
    }),
    document.getElementById("free-undo").addEventListener("click",()=>{
      f.pop(),w()
    }),
    document.getElementById("free-clear").addEventListener("click",()=>{
      f=[],w()
    }),
    document.getElementById("free-apply").addEventListener("click",()=>{
      0!==f.length&&(document.querySelectorAll(".meter-pill").forEach(e=>e.classList.remove("active")),x=[...f],k=f.length,E=f.reduce((e,t)=>e+t,0)+"/8",b=b.filter(e=>e<k),ve(),Ie(E),h&&(le(),se()),Y())
    }),
    document.querySelectorAll(".subdiv-btn").forEach(e=>{
      e.addEventListener("click",()=>{
        v=parseInt(e.dataset.div),document.querySelectorAll(".subdiv-btn").forEach(t=>t.classList.toggle("active",t===e)),Y()
      })
    });
    const ciP=document.getElementById("pill-countin");
    ciP&&ciP.addEventListener("click",()=>{
      ciOn=!ciOn,ciP.classList.toggle("active",ciOn),saveCfg()
    });
    const gpP=document.getElementById("pill-gap");
    gpP&&gpP.addEventListener("click",()=>{
      gpOn=!gpOn,gpP.classList.toggle("active",gpOn);
      const gf=document.getElementById("gap-fields");
      gf&&(gf.hidden=!gpOn),gpUpdate(!1),saveCfg()
    });
    const gpA=document.getElementById("gap-play");
    gpA&&gpA.addEventListener("input",()=>{
      gpPlay=Math.max(1,parseInt(gpA.value)||1),saveCfg()
    });
    const gpB=document.getElementById("gap-mute");
    gpB&&gpB.addEventListener("input",()=>{
      gpMute=Math.max(1,parseInt(gpB.value)||1),saveCfg()
    });
    const M=document.getElementById("vol-click"),
    q=document.getElementById("vol-accent");
    M.addEventListener("input",()=>{
      R=M.value/100,document.getElementById("vol-click-num").textContent=M.value,saveCfg()
    }),
    q.addEventListener("input",()=>{
      N=q.value/100,document.getElementById("vol-accent-num").textContent=q.value,saveCfg()
    }),
    document.querySelectorAll(".sound-pill").forEach(e=>{
      e.addEventListener("click",()=>{
        H=e.dataset.sound,CL[H]&&lc(),document.querySelectorAll(".sound-pill").forEach(t=>t.classList.toggle("active",t===e)),Y()
      })
    }),
    document.getElementById("btn-prac").addEventListener("click",()=>{
      L=!L;
      const e=document.getElementById("btn-prac");
      if(e.classList.toggle("active",L),e.textContent=L?"DETENER ENSAYO":"INICIAR ENSAYO",L){
        oe(parseInt(document.getElementById("prac-bpm-start").value)||60),A=0,r&&(r.style.width="0%"),g=0,h||se()
      }
    }),
    document.getElementById("btn-share").addEventListener("click",async()=>{
      const e=location.href,t=document.getElementById("btn-share"),n=t.querySelector(".share-label");
      try{
        await navigator.clipboard.writeText(e)
      }catch(t){
        return void prompt("Copia este enlace:",e)
      }t.classList.add("copied"),n&&(n.textContent="¡Copiado!"),setTimeout(()=>{
        t.classList.remove("copied"),n&&(n.textContent="Compartir")
      },2e3)
    });
    const V=document.querySelector(".tm-metronomo-wrap");
    let D=!1;
    const K=document.getElementById("btn-fullscreen"),
    P=document.getElementById("fs-icon"),
    O=K.querySelector(".fs-label");
    function F(e){
      D=e,
      V.classList.toggle("is-fullscreen",e),
      document.body.classList.toggle("has-fullscreen",e),
      P.innerHTML=e?'<polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/><line x1="10" y1="14" x2="3" y2="21"/><line x1="21" y1="3" x2="14" y2="10"/>':'<polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>',
      O&&(O.textContent=e?"Salir":"Pantalla completa"),
      K.title=e?"Salir de pantalla completa":"Pantalla completa",
      e&&(V.scrollTop=0)
    }K.addEventListener("click",()=>F(!D)),
    document.addEventListener("keydown",e=>{
      if("INPUT"!==e.target.tagName){
        if("Space"===e.code&&(e.preventDefault(),ie()),"KeyT"===e.code&&be(),"Escape"===e.key&&D&&F(!1),"ArrowUp"===e.code){
          e.preventDefault();
          const t=e.shiftKey&&(e.metaKey||e.ctrlKey)?10:e.shiftKey?5:1;
          oe(p+t)
        }if("ArrowDown"===e.code){
          e.preventDefault();
          const t=e.shiftKey&&(e.metaKey||e.ctrlKey)?10:e.shiftKey?5:1;
          oe(p-t)
        }
      }
    }),
    document.addEventListener("visibilitychange",()=>{
      !document.hidden&&C&&"suspended"===C.state&&C.resume(),document.hidden||!h||T||S(),document.hidden&&h&&ce()
    }),
    "requestIdleCallback"in window?requestIdleCallback(pf):setTimeout(pf,1200),
    ["pointerdown","keydown","touchstart"].forEach(ev=>document.addEventListener(ev,()=>lc(),{once:!0,passive:!0})),
    ve(),
    Ie(E),
    pe(),
    me(null),
    tmPracInit();
    const G=function(){
      const e=new URLSearchParams(location.search),
      t={
      };
      if(e.has("bpm")){
        const n=parseInt(e.get("bpm"));
        n>=15&&n<=300&&(t.bpm=n)
      }if(e.has("meter")&&(t.meter=e.get("meter")),e.has("subdiv")){
        const n=parseInt(e.get("subdiv"));
        [1,2,3,4,5,6,7,8].includes(n)&&(t.subdiv=n)
      }if(e.has("sound")&&["clasico","electronico","digital","templeblock","claves","cencerro"].includes(e.get("sound"))&&(t.sound=e.get("sound")),e.has("groups")){
        const n=e.get("groups").split("-").map(Number).filter(e=>e>=1&&e<=3);
        n.length>=2&&(t.groups=n)
      }return t
    }();
    (function(){
      let L;
      try{
        L=JSON.parse(localStorage.getItem("tm_metro_v1")||"{}")
      }catch(e){
        return
      }if(!L||"object"!=typeof L)return;
      if(!("bpm"in G)&&L.bpm>=15&&L.bpm<=300)G.bpm=L.bpm;
      if(!("subdiv"in G)&&[1,2,3,4,5,6,7,8].includes(L.subdiv))G.subdiv=L.subdiv;
      if(!("sound"in G)&&["clasico","electronico","digital","templeblock","claves","cencerro"].includes(L.sound))G.sound=L.sound;
      if(!("meter"in G)&&!("groups"in G)){
        if(Array.isArray(L.groups)){
          const g=L.groups.map(Number).filter(e=>e>=1&&e<=3);
          if(g.length>=2)G.groups=g
        }if(!("groups"in G)&&"string"==typeof L.meter&&/^\d+\/\d+$/.test(L.meter))G.meter=L.meter
      }if("number"==typeof L.vc){
        R=Math.max(0,Math.min(100,L.vc))/100;
        const a=document.getElementById("vol-click");
        a&&(a.value=Math.round(100*R),document.getElementById("vol-click-num").textContent=a.value)
      }if("number"==typeof L.va){
        N=Math.max(0,Math.min(100,L.va))/100;
        const o=document.getElementById("vol-accent");
        o&&(o.value=Math.round(100*N),document.getElementById("vol-accent-num").textContent=o.value)
      }"boolean"==typeof L.ci&&(ciOn=L.ci),"boolean"==typeof L.gp&&(gpOn=L.gp),L.gpp>=1&&(gpPlay=L.gpp),L.gpm>=1&&(gpMute=L.gpm);
      const ciP=document.getElementById("pill-countin");
      ciP&&ciP.classList.toggle("active",ciOn);
      const gpP=document.getElementById("pill-gap");
      gpP&&gpP.classList.toggle("active",gpOn);
      const gf=document.getElementById("gap-fields");
      gf&&(gf.hidden=!gpOn);
      const ga=document.getElementById("gap-play");
      ga&&(ga.value=gpPlay);
      const gb=document.getElementById("gap-mute");
      gb&&(gb.value=gpMute)
    })();
    G.bpm&&(p=Math.max(15,Math.min(300,G.bpm)),pe()),
    G.sound&&(H=G.sound,document.querySelectorAll(".sound-pill").forEach(e=>{
      e.classList.toggle("active",e.dataset.sound===H)
    })),
    G.groups?(f=[...G.groups],w(),document.querySelectorAll(".meter-pill").forEach(e=>e.classList.remove("active")),x=[...G.groups],k=G.groups.length,E=G.groups.reduce((e,t)=>e+t,0)+"/8",ve(),Ie(E)):G.meter&&Ee(G.meter),
    G.subdiv&&(v=G.subdiv,document.querySelectorAll(".subdiv-btn").forEach(e=>{
      e.classList.toggle("active",parseInt(e.dataset.div)===v)
    })),
    m=!0
  }"loading"===document.readyState?document.addEventListener("DOMContentLoaded",xe):xe(),
  window.metronomoSetBpm=function(e){
    oe(e),
    document.querySelector(".tm-metronomo-wrap").scrollIntoView({
      behavior:"smooth",block:"start"
    })
  }
}();
