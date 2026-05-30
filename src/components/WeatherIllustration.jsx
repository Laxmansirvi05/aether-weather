import React from 'react';

/* ─────────────────────────────────────────────────────────────────────────
   WeatherIllustration – full-bleed photorealistic sky scene.
   Renders as position:absolute inset:0 inside the hero card.
   All styles are inline – zero Tailwind purge risk.
───────────────────────────────────────────────────────────────────────── */

const STYLES = `
@keyframes wi-cloud-drift   { 0%,100%{transform:translateX(0px)} 50%{transform:translateX(10px)} }
@keyframes wi-cloud-drift-r { 0%,100%{transform:translateX(0px)} 50%{transform:translateX(-8px)} }
@keyframes wi-sun-pulse {
  0%,100% { box-shadow: 0 0 38px rgba(255,210,40,0.65), 0 0 80px rgba(255,155,0,0.38), 0 0 150px rgba(255,110,0,0.18); }
  50%     { box-shadow: 0 0 58px rgba(255,215,50,0.82), 0 0 110px rgba(255,165,0,0.50), 0 0 200px rgba(255,120,0,0.26); }
}
@keyframes wi-ray-pulse {
  0%,100% { opacity:0.32; transform:scaleX(0.78); }
  50%     { opacity:0.82; transform:scaleX(1.22); }
}
@keyframes wi-moon-breathe {
  0%,100% { box-shadow: inset -6px -6px 12px rgba(140,180,255,0.3), 0 0 32px rgba(175,205,255,0.52), 0 0 72px rgba(140,170,255,0.22); }
  50%     { box-shadow: inset -6px -6px 12px rgba(140,180,255,0.3), 0 0 52px rgba(180,210,255,0.76), 0 0 105px rgba(140,170,255,0.36); }
}
@keyframes wi-moon-halo {
  0%,100% { opacity:0.45; }
  50%     { opacity:0.85; }
}
@keyframes wi-star-twinkle {
  0%,100% { opacity:0.15; transform:scale(0.7); }
  50%     { opacity:0.95; transform:scale(1.2); }
}
@keyframes wi-rain {
  0%   { transform:translateY(-50px); opacity:0; }
  18%  { opacity:0.85; }
  100% { transform:translateY(240px); opacity:0; }
}
@keyframes wi-snow {
  0%   { transform:translateY(-25px) translateX(0) rotate(0deg); opacity:0; }
  15%  { opacity:0.88; }
  100% { transform:translateY(210px) translateX(14px) rotate(360deg); opacity:0; }
}
@keyframes wi-lightning {
  0%,84%,100% { opacity:0; }
  86%,95%     { opacity:1; }
}
@keyframes wi-lightning2 {
  0%,68%,100% { opacity:0; }
  70%,77%     { opacity:0.62; }
}
@keyframes wi-fog-drift {
  0%   { transform:translateX(-16px); opacity:0.20; }
  50%  { transform:translateX(16px);  opacity:0.48; }
  100% { transform:translateX(-16px); opacity:0.20; }
}
`;

let _injected = false;
function injectStyles() {
  if (_injected || typeof document === 'undefined') return;
  const el = document.createElement('style');
  el.textContent = STYLES;
  document.head.appendChild(el);
  _injected = true;
}

/* ── Sky background gradients ───────────────────────────────────────────── */
const SKY = {
  // Vibrant bright sky blue for sunny days
  dayClr:  'linear-gradient(180deg, #1e5dd8 0%, #3582ef 32%, #7ab2f8 68%, #b3d7ff 100%)',
  // Overcast daytime: soft gray-blue
  dayCld:  'linear-gradient(180deg, #46688f 0%, #5d81a8 32%, #86a8cc 68%, #b4cce3 100%)',
  // Deep navy blue gradient for clear nights
  night:   'linear-gradient(180deg, #02091c 0%, #06112a 32%, #0b1a3d 68%, #122552 100%)',
  // Darker cloudy night
  ngtCld:  'linear-gradient(180deg, #010614 0%, #040c1d 32%, #081329 68%, #0d1a38 100%)',
  // Dark blue-gray for rain
  rain:    'linear-gradient(180deg, #1d2c42 0%, #293d56 32%, #38516e 68%, #4a6887 100%)',
  // Dark storm sky
  storm:   'linear-gradient(180deg, #0b121e 0%, #121c2e 32%, #1b2942 68%, #253654 100%)',
  // Fog/mist - soft gray-blue
  fog:     'linear-gradient(180deg, #2b3b4f 0%, #435870 32%, #5f7a96 68%, #819ebd 100%)',
  // Snow - cool icy blue
  snow:    'linear-gradient(180deg, #243c5e 0%, #36547a 32%, #4d729c 68%, #6a95c4 100%)',
};

/* ── Stars ──────────────────────────────────────────────────────────────── */
const STAR_DATA = [
  {x:'10%',y:'7%', r:1.5,d:'2.0s',dl:'0s'  },{x:'24%',y:'3%', r:2,  d:'1.7s',dl:'0.3s'},
  {x:'41%',y:'9%', r:1.5,d:'2.3s',dl:'0.8s'},{x:'58%',y:'5%', r:2,  d:'1.9s',dl:'0.2s'},
  {x:'74%',y:'2%', r:1.5,d:'2.5s',dl:'1.1s'},{x:'87%',y:'8%', r:1,  d:'1.6s',dl:'0.5s'},
  {x:'18%',y:'17%',r:1,  d:'2.1s',dl:'1.3s'},{x:'52%',y:'14%',r:1.5,d:'1.8s',dl:'0.7s'},
  {x:'80%',y:'18%',r:1,  d:'2.4s',dl:'0.4s'},{x:'34%',y:'23%',r:1,  d:'2.2s',dl:'1.6s'},
  {x:'68%',y:'22%',r:1.5,d:'1.7s',dl:'0.9s'},{x:'4%', y:'21%',r:1,  d:'2.0s',dl:'0.6s'},
];
const StarField = () => (
  <>
    {STAR_DATA.map((s, i) => (
      <div key={i} style={{
        position:'absolute', left:s.x, top:s.y,
        width:s.r*2, height:s.r*2, borderRadius:'50%', background:'white',
        animation:`wi-star-twinkle ${s.d} ease-in-out infinite ${s.dl}`,
      }} />
    ))}
  </>
);

/* ── Sun element ────────────────────────────────────────────────────────── */
const Sun = ({ right, top, size = 88 }) => (
  <div style={{ position:'absolute', right, top }}>
    {/* Corona rings */}
    {[size*2.6, size*2.0, size*1.55].map((sz, i) => (
      <div key={i} style={{
        position:'absolute',
        width:sz, height:sz, borderRadius:'50%',
        background:`radial-gradient(circle, rgba(255,${195-i*22},${55-i*18},${0.14-i*0.04}) 0%, transparent 68%)`,
        top:-(sz-size)/2, left:-(sz-size)/2,
      }} />
    ))}
    {/* Rays */}
    {Array.from({length:12}, (_,i) => i*30).map((deg, i) => (
      <div key={i} style={{
        position:'absolute',
        width: 3, height: size * 0.66,
        borderRadius: 4,
        background:'linear-gradient(to top, transparent 0%, rgba(255,215,55,0.72) 100%)',
        transformOrigin:`1.5px ${size/2 + size*0.33}px`,
        transform:`rotate(${deg}deg) translateY(-${size/2}px)`,
        animation:`wi-ray-pulse ${1.4 + i*0.1}s ease-in-out infinite`,
      }} />
    ))}
    {/* Core disc */}
    <div style={{
      position:'absolute',
      width:size, height:size, borderRadius:'50%',
      background:'radial-gradient(circle at 38% 35%, #fffae0, #ffe866, #ffaa00)',
      animation:'wi-sun-pulse 3.8s ease-in-out infinite',
    }} />
    {/* Sheen */}
    <div style={{
      position:'absolute',
      width:size*0.30, height:size*0.18, borderRadius:'50%',
      background:'rgba(255,255,255,0.55)',
      top:size*0.14, left:size*0.18,
      filter:'blur(4px)',
    }} />
  </div>
);

/* ── Moon element ───────────────────────────────────────────────────────── */
const Moon = ({ right, top, size = 70 }) => (
  <div style={{ position:'absolute', right, top }}>
    {/* Outer halo */}
    <div style={{
      position:'absolute',
      width:size*2.0, height:size*2.0, borderRadius:'50%',
      background:'radial-gradient(circle, rgba(160,190,255,0.14) 0%, transparent 70%)',
      top:-size*0.5, left:-size*0.5,
      animation:'wi-moon-halo 4.8s ease-in-out infinite',
    }} />
    {/* Clean bright moon disc (no dark overlap) */}
    <div style={{
      position:'absolute',
      width:size, height:size, borderRadius:'50%',
      background:'radial-gradient(circle at 40% 36%, #ffffff, #e0ebff, #c0d8ff)',
      animation:'wi-moon-breathe 5s ease-in-out infinite',
    }} />
    {/* Sheen on lit limb */}
    <div style={{
      position:'absolute',
      width:size*0.27, height:size*0.15, borderRadius:'50%',
      background:'rgba(255,255,255,0.65)',
      top:size*0.15, left:size*0.15,
      filter:'blur(4px)',
    }} />
  </div>
);

/* ── Volumetric 3D cloud (Premium Vector SVG) ───────────────────────────── */
const SmoothCloud = ({
  left, top, w = 220, night = false, opacity = 1,
  animName = 'wi-cloud-drift', animDelay = '0s', animDur = '25s',
  flip = false
}) => {
  const fillUrl = night ? 'url(#cloudGradNight)' : 'url(#cloudGradDay)';
  return (
    <div style={{
      position: 'absolute', left, top,
      width: w, height: w * 0.6,
      opacity,
      animation: `${animName} ${animDur} ease-in-out infinite ${animDelay}`,
    }}>
      <div style={{ width: '100%', height: '100%', transform: flip ? 'scaleX(-1)' : 'none' }}>
        <svg viewBox="0 0 100 60" width="100%" height="100%"
             style={{ filter: night ? 'drop-shadow(0px 12px 24px rgba(0,20,50,0.45))' : 'drop-shadow(0px 12px 24px rgba(0,30,80,0.15))' }}>
          <path d="M 25 50 H 75 C 88 50 95 40 95 28 C 95 15 85 8 72 8 C 65 8 58 13 55 18 C 50 10 40 5 28 5 C 12 5 5 18 5 32 C 5 43 12 50 25 50 Z"
                fill={fillUrl} />
        </svg>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════════════
   Main export – full panel sky scene
══════════════════════════════════════════════════════════════════════════ */
export const WeatherIllustration = ({ type, isDay = true }) => {
  injectStyles();

  // Sky background for this condition
  const skyMap = {
    sun:        isDay ? SKY.dayClr  : SKY.night,
    'sun-cloud':isDay ? SKY.dayCld  : SKY.ngtCld,
    cloud:      isDay ? SKY.dayCld  : SKY.ngtCld,
    'cloud-rain':SKY.rain,
    snow:       SKY.snow,
    storm:      SKY.storm,
    fog:        SKY.fog,
  };
  const skyBg = skyMap[type] || (isDay ? SKY.dayClr : SKY.night);

  const panel = {
    position:'absolute', inset:0,
    background:skyBg,
    overflow:'hidden',
    borderRadius:'inherit',
  };

  /* ── Inject Cloud Gradients Once per Scene ─ */
  const CloudDefs = () => (
    <svg width="0" height="0" style={{ position: 'absolute' }}>
      <defs>
        <linearGradient id="cloudGradDay" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,1)" />
          <stop offset="50%" stopColor="rgba(250,252,255,0.95)" />
          <stop offset="100%" stopColor="rgba(220,230,245,0.85)" />
        </linearGradient>
        <linearGradient id="cloudGradNight" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(160,185,225,0.95)" />
          <stop offset="100%" stopColor="rgba(90,115,160,0.85)" />
        </linearGradient>
      </defs>
    </svg>
  );

  /* ── Atmospheric horizon glow (daytime) ─ */
  const HorizonGlow = () => isDay ? (
    <div style={{
      position:'absolute', bottom:0, left:0, right:0, height:'42%',
      background:'linear-gradient(to top, rgba(90,155,200,0.22), transparent)',
    }} />
  ) : null;

  /* ── CLEAR ──────────────────────────────────────── */
  if (type === 'sun') {
    if (!isDay) return (
      <div style={panel}>
        <StarField />
        <Moon right="10%" top="8%" size={76} />
      </div>
    );
    return (
      <div style={panel}>
        <HorizonGlow />
        <Sun right="10%" top="8%" size={96} />
      </div>
    );
  }

  /* ── PARTLY CLOUDY ──────────────────────────────── */
  if (type === 'sun-cloud') {
    if (!isDay) return (
      <div style={panel}>
        <CloudDefs />
        <StarField />
        <Moon right="12%" top="9%" size={66} />
        <SmoothCloud left="28%" top="36%" w={220} night opacity={0.75} animDur="35s"  animDelay="0s"   animName="wi-cloud-drift" />
        <SmoothCloud left="65%" top="50%" w={160} night opacity={0.55} animDur="45s"  animDelay="2s" animName="wi-cloud-drift-r" flip />
      </div>
    );
    return (
      <div style={panel}>
        <CloudDefs />
        <HorizonGlow />
        <SmoothCloud left="55%" top="14%" w={220} opacity={0.65} animDur="40s"  animDelay="1s" animName="wi-cloud-drift-r" flip />
        <Sun right="13%" top="7%" size={84} />
        <SmoothCloud left="22%" top="38%" w={260} opacity={0.96} animDur="35s" animDelay="0s"   animName="wi-cloud-drift" />
      </div>
    );
  }

  /* ── OVERCAST ────────────────────────────────────── */
  if (type === 'cloud') {
    return (
      <div style={panel}>
        <CloudDefs />
        {!isDay && <StarField />}
        <SmoothCloud left="-2%"  top="8%"  w={220} night={!isDay} opacity={isDay?0.65:0.50} animDur="35s" animDelay="1s" animName="wi-cloud-drift-r" />
        <SmoothCloud left="32%"  top="22%" w={260} night={!isDay} opacity={isDay?0.90:0.75} animDur="40s" animDelay="0s" animName="wi-cloud-drift" />
        <SmoothCloud left="64%"  top="14%" w={200} night={!isDay} opacity={isDay?0.75:0.60} animDur="45s" animDelay="2s" animName="wi-cloud-drift-r" flip />
        <SmoothCloud left="50%"  top="52%" w={180} night={!isDay} opacity={isDay?0.55:0.45} animDur="38s" animDelay="3s" animName="wi-cloud-drift" />
      </div>
    );
  }

  /* ── RAIN ────────────────────────────────────────── */
  if (type === 'cloud-rain') {
    const drops = Array.from({length:18}, (_, i) => ({
      left:`${5 + i * 5.3}%`,
      dur: `${0.68 + (i % 4) * 0.18}s`,
      delay:`${((i * 0.12) % 0.85).toFixed(2)}s`,
      h: 14 + (i % 5) * 4,
    }));
    return (
      <div style={panel}>
        <CloudDefs />
        {!isDay && <StarField />}
        <SmoothCloud left="-4%"  top="3%"  w={240} night={!isDay} opacity={0.88} animDur="30s" animDelay="0s" animName="wi-cloud-drift" />
        <SmoothCloud left="52%"  top="8%"  w={220} night={!isDay} opacity={0.82} animDur="35s" animDelay="1s" animName="wi-cloud-drift-r" flip />
        {drops.map((d, i) => (
          <div key={i} style={{
            position:'absolute', left:d.left, top:'48%',
            width:1.8, height:d.h, borderRadius:9999,
            background:'linear-gradient(to bottom, rgba(130,205,255,0.82), rgba(80,165,230,0.10))',
            animation:`wi-rain ${d.dur} linear infinite ${d.delay}`,
          }} />
        ))}
      </div>
    );
  }

  /* ── SNOW ────────────────────────────────────────── */
  if (type === 'snow') {
    const flakes = Array.from({length:12}, (_, i) => ({
      left:`${4 + i * 8}%`,
      dur:`${1.8 + (i % 5) * 0.45}s`,
      delay:`${((i * 0.18) % 1.1).toFixed(2)}s`,
      r: 2 + (i % 3),
    }));
    return (
      <div style={panel}>
        <CloudDefs />
        {!isDay && <StarField />}
        <SmoothCloud left="-4%"  top="4%"  w={230} night={!isDay} opacity={0.85} animDur="35s" animDelay="0s" animName="wi-cloud-drift" />
        <SmoothCloud left="52%"  top="9%"  w={210} night={!isDay} opacity={0.78} animDur="40s" animDelay="1s" animName="wi-cloud-drift-r" flip />
        {flakes.map((f, i) => (
          <div key={i} style={{
            position:'absolute', left:f.left, top:'50%',
            width:f.r*2, height:f.r*2, borderRadius:'50%',
            background:'rgba(228,242,255,0.94)',
            boxShadow:`0 0 ${f.r*2}px rgba(180,220,255,0.7)`,
            animation:`wi-snow ${f.dur} ease-in infinite ${f.delay}`,
          }} />
        ))}
      </div>
    );
  }

  /* ── THUNDERSTORM ─────────────────────────────────── */
  if (type === 'storm') {
    const rdrops = Array.from({length:12}, (_, i) => ({
      left:`${6 + i * 8}%`,
      dur:`${0.60 + (i%3)*0.14}s`,
      delay:`${((i*0.10)%0.65).toFixed(2)}s`,
    }));
    return (
      <div style={panel}>
        <CloudDefs />
        {!isDay && <StarField />}
        <SmoothCloud left="-6%"  top="2%"  w={250} night opacity={0.92} animDur="28s" animDelay="0s" animName="wi-cloud-drift" />
        <SmoothCloud left="52%"  top="5%"  w={230} night opacity={0.88} animDur="32s" animDelay="1s" animName="wi-cloud-drift-r" flip />
        {/* Primary bolt */}
        <svg style={{
          position:'absolute', left:'36%', top:'50%',
          width:46, height:72,
          filter:'drop-shadow(0 0 9px #00E5FF) drop-shadow(0 0 20px rgba(0,229,255,0.55))',
          animation:'wi-lightning 3s ease-in-out infinite',
        }} viewBox="0 0 24 40" fill="none">
          <path d="M15 0L2 22H13L8 40L22 16H11L15 0Z" fill="#00E5FF" />
        </svg>
        {/* Secondary bolt */}
        <svg style={{
          position:'absolute', left:'64%', top:'54%',
          width:28, height:44,
          filter:'drop-shadow(0 0 5px rgba(100,205,255,0.7))',
          animation:'wi-lightning2 4s ease-in-out infinite 0.8s',
        }} viewBox="0 0 24 40" fill="none">
          <path d="M15 0L2 22H13L8 40L22 16H11L15 0Z" fill="rgba(0,229,255,0.46)" />
        </svg>
        {rdrops.map((d, i) => (
          <div key={i} style={{
            position:'absolute', left:d.left, top:'53%',
            width:1.5, height:14, borderRadius:9999,
            background:'rgba(100,185,255,0.35)',
            animation:`wi-rain ${d.dur} linear infinite ${d.delay}`,
          }} />
        ))}
      </div>
    );
  }

  /* ── FOG / MIST ───────────────────────────────────── */
  if (type === 'fog') {
    const bands = [
      {top:'18%',w:'82%',h:18,dl:'0s',   dur:'4.2s'},
      {top:'36%',w:'66%',h:15,dl:'0.7s', dur:'5.1s'},
      {top:'52%',w:'78%',h:18,dl:'1.3s', dur:'4.6s'},
      {top:'68%',w:'58%',h:14,dl:'0.4s', dur:'5.6s'},
    ];
    return (
      <div style={panel}>
        {!isDay && <StarField />}
        {isDay  && <Sun  right="14%" top="12%" size={66} />}
        {!isDay && <Moon right="13%" top="10%" size={60} />}
        {bands.map((b, i) => (
          <div key={i} style={{
            position:'absolute', top:b.top, left:'50%',
            transform:'translateX(-50%)',
            width:b.w, height:b.h, borderRadius:9999,
            background:isDay
              ? 'rgba(200,220,238,0.28)'
              : 'rgba(78,105,172,0.26)',
            backdropFilter:'blur(6px)', WebkitBackdropFilter:'blur(6px)',
            border:`1px solid ${isDay ? 'rgba(220,235,248,0.18)' : 'rgba(118,142,210,0.14)'}`,
            animation:`wi-fog-drift ${b.dur} ease-in-out infinite ${b.dl}`,
          }} />
        ))}
      </div>
    );
  }

  /* ── FALLBACK ─────────────────────────────────────── */
  return (
    <div style={panel}>
      {isDay
        ? <><HorizonGlow /><Sun right="12%" top="10%" size={88} /></>
        : <><StarField /><Moon right="12%" top="10%" size={70} /></>
      }
    </div>
  );
};
