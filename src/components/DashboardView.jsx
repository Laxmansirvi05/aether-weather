import React, { useRef } from 'react';
import {
  Wind, Droplets, Sun, ArrowRight, ArrowLeft,
  Maximize2, Compass, Sunrise, Sunset,
} from 'lucide-react';
import { WeatherIllustration } from './WeatherIllustration';
import { getWeatherCodeInfo, getAQIDescription, getUVDescription } from '../utils/weatherUtils';

// ── Skeleton shimmer block ────────────────────────────────────────────────
const Shimmer = ({ w = '100%', h = 20, radius = 12, className = '' }) => (
  <div
    className={className}
    style={{
      width: w, height: h, borderRadius: radius,
      background: 'linear-gradient(90deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0.04) 100%)',
      backgroundSize: '200% 100%',
      animation: 'shimmer 1.6s ease-in-out infinite',
    }}
  />
);

// Inject shimmer keyframe once
let shimmerInjected = false;
function injectShimmer() {
  if (shimmerInjected || typeof document === 'undefined') return;
  const tag = document.createElement('style');
  tag.textContent = `@keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }`;
  document.head.appendChild(tag);
  shimmerInjected = true;
}

// ── Dashboard skeleton ────────────────────────────────────────────────────
const DashboardSkeleton = () => {
  injectShimmer();
  return (
    <div className="flex-1 p-6 space-y-6 animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hero card skeleton */}
        <div className="lg:col-span-2 glass-card rounded-[2rem] p-8 min-h-[300px] flex flex-col justify-between">
          <div className="space-y-4">
            <Shimmer w={140} h={12} radius={8} />
            <Shimmer w={120} h={72} radius={12} />
            <Shimmer w={180} h={20} radius={8} />
            <div className="flex gap-3 mt-4">
              <Shimmer w={60} h={28} radius={20} />
              <Shimmer w={60} h={28} radius={20} />
            </div>
          </div>
        </div>
        {/* Side cards skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card rounded-[1.5rem] p-5 h-[135px]"><Shimmer w="100%" h="100%" radius={16} /></div>
            <div className="glass-card rounded-[1.5rem] p-5 h-[135px]"><Shimmer w="100%" h="100%" radius={16} /></div>
          </div>
          <div className="glass-card rounded-[1.5rem] p-5 h-[135px]"><Shimmer w="100%" h="100%" radius={16} /></div>
        </div>
      </div>
      {/* Hourly skeleton */}
      <div className="glass-card rounded-[2rem] p-6">
        <Shimmer w={160} h={20} radius={8} className="mb-6" />
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex-shrink-0 w-24 flex flex-col items-center gap-3">
              <Shimmer w={50} h={12} radius={6} />
              <Shimmer w={40} h={40} radius={12} />
              <Shimmer w={36} h={14} radius={6} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const DashboardView = ({ weatherData, airQualityData, city, isLoading, tempUnit, windUnit, errorMsg }) => {
  const hourlyScrollRef = useRef(null);

  if (errorMsg) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-12 text-brand-textSecondary">
        <div className="text-red-400 mb-4 text-center">
          <p className="font-sans text-xl font-semibold mb-2">{errorMsg}</p>
          <p className="font-sans text-sm">Try searching for a different city or check your internet connection.</p>
        </div>
      </div>
    );
  }

  if (isLoading || !weatherData) return <DashboardSkeleton />;

  const current        = weatherData.current;
  const hourly         = weatherData.hourly;
  const daily          = weatherData.daily;
  const currentCodeInfo = getWeatherCodeInfo(current.weathercode);
  const aqiInfo        = airQualityData
    ? getAQIDescription(airQualityData.aqi)
    : { label: 'Good', color: 'text-teal-400', desc: 'Acceptable air quality.' };
  const uvInfo = getUVDescription(current.uvIndex);
  const isDay  = current.isDay !== false; // default true

  const scroll = (direction) => {
    if (hourlyScrollRef.current) {
      const { scrollLeft, clientWidth } = hourlyScrollRef.current;
      hourlyScrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">

      {/* ── Top: Hero Card + Side Cards ──────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Hero Weather Card – full-bleed 3D sky scene */}
        <div className="lg:col-span-2 rounded-[2rem] relative overflow-hidden border border-white/10 group min-h-[300px] flex">

          {/* Sky scene fills the card background */}
          <WeatherIllustration type={currentCodeInfo.illustration} isDay={isDay} />

          {/* Left-to-right dark gradient — makes text readable */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 1, borderRadius: 'inherit',
            background: 'linear-gradient(90deg, rgba(3,8,20,0.96) 0%, rgba(3,8,20,0.88) 32%, rgba(3,8,20,0.52) 56%, transparent 100%)',
            pointerEvents: 'none',
          }} />

          {/* Hover teal accent top-right */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-brand-accentTeal/12 via-transparent to-transparent rounded-full pointer-events-none filter blur-2xl opacity-50 group-hover:opacity-90 transition-opacity duration-500" style={{ zIndex: 2 }} />

          {/* Text content */}
          <div className="relative w-full flex flex-col justify-between p-8" style={{ zIndex: 3 }}>

            {/* Location + temperature + condition */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-white/60 font-sans">
                <Compass className="w-4 h-4 text-brand-accentTeal animate-pulse" />
                <span className="text-sm font-medium tracking-wide uppercase">{city}</span>
              </div>

              <div className="space-y-1">
                <h2 className="text-7xl font-extrabold tracking-tighter text-white font-sans drop-shadow-lg">
                  {Math.round(current.temp)}°
                </h2>
                <p className="text-xl font-semibold text-white/90 font-sans tracking-wide drop-shadow">
                  {currentCodeInfo.label}
                </p>
                <p className="text-sm text-white/55 font-sans">
                  Feels like {Math.round(current.feelsLike)}°
                </p>
              </div>
            </div>

            {/* H/L + Sunrise/Sunset pills */}
            <div className="flex flex-wrap gap-2 mt-5">
              {[
                { label: `H: ${Math.round(daily.tempMax[0])}°` },
                { label: `L: ${Math.round(daily.tempMin[0])}°` },
                daily.sunrise?.[0] && { label: daily.sunrise[0], icon: <Sunrise className="w-3 h-3 text-amber-400" /> },
                daily.sunset?.[0]  && { label: daily.sunset[0],  icon: <Sunset  className="w-3 h-3 text-orange-400" /> },
              ].filter(Boolean).map((item, i) => (
                <span key={i} className="px-3 py-1.5 rounded-full text-xs text-white/75 font-sans font-medium flex items-center gap-1.5"
                  style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)' }}>
                  {item.icon}
                  {item.label}
                </span>
              ))}
            </div>

          </div>
        </div>

        {/* Side Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">

          {/* Wind + Humidity */}
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card rounded-[1.5rem] p-5 flex flex-col justify-between h-[135px] hover:border-brand-accentTeal/30 transition-all duration-300">
              <div className="flex justify-between items-start text-brand-textMuted">
                <Wind className="w-5 h-5 text-brand-accentTeal" />
                <span className="text-[10px] font-bold tracking-wider uppercase font-sans">Wind</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold font-sans text-white">{Math.round(current.windSpeed)}</span>
                  <span className="text-xs text-brand-textMuted font-sans">{windUnit === 'mph' ? 'mph' : 'km/h'}</span>
                </div>
                <p className="text-[11px] text-brand-textSecondary font-sans flex items-center gap-1">
                  Direction: <span className="font-semibold text-white">{current.windDirectionText}</span>
                </p>
              </div>
            </div>

            <div className="glass-card rounded-[1.5rem] p-5 flex flex-col justify-between h-[135px] hover:border-brand-accentTeal/30 transition-all duration-300">
              <div className="flex justify-between items-start text-brand-textMuted">
                <Droplets className="w-5 h-5 text-brand-accentTeal" />
                <span className="text-[10px] font-bold tracking-wider uppercase font-sans">Humidity</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold font-sans text-white">{current.humidity}</span>
                  <span className="text-xs text-brand-textMuted font-sans">%</span>
                </div>
                <p className="text-[11px] text-brand-textSecondary font-sans">
                  Dew point: <span className="font-semibold text-white">
                    {Math.round(current.temp - ((100 - current.humidity) * (tempUnit === 'fahrenheit' ? 0.36 : 0.2)))}°
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* UV Index */}
          <div className="glass-card rounded-[1.5rem] p-5 flex flex-col justify-between h-[135px] relative overflow-hidden hover:border-brand-accentTeal/30 transition-all duration-300">
            <div className="flex justify-between items-start text-brand-textMuted">
              <Sun className="w-5 h-5 text-brand-accentTeal" />
              <span className="text-[10px] font-bold tracking-wider uppercase font-sans">UV Index</span>
              <span className="text-[10px] font-extrabold text-brand-accentTeal bg-brand-accentTeal/10 px-2 py-0.5 rounded font-sans uppercase">
                {uvInfo.label}
              </span>
            </div>
            <div className="space-y-3">
              <div className="w-full h-1.5 bg-brand-sidebar rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-brand-accentTeal to-brand-accentCyan rounded-full transition-all duration-700"
                  style={{ width: `${Math.min((current.uvIndex / 12) * 100, 100)}%` }}
                />
              </div>
              <p className="text-[11px] text-brand-textSecondary leading-normal font-sans">
                {current.uvIndex <= 2
                  ? 'Use sun protection between 11:00 AM and 4:00 PM.'
                  : 'Protection required. Seek shade, wear a hat and sunscreen.'}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ── Hourly Forecast ───────────────────────────────────────────── */}
      <div className="glass-card rounded-[2rem] p-6 relative">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-white font-sans tracking-wide">Hourly Forecast</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-1.5 bg-brand-sidebar hover:bg-brand-card/80 border border-brand-cardBorder text-brand-textSecondary hover:text-white rounded-full transition-all duration-200 hover:border-brand-accentTeal/40"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-1.5 bg-brand-sidebar hover:bg-brand-card/80 border border-brand-cardBorder text-brand-textSecondary hover:text-white rounded-full transition-all duration-200 hover:border-brand-accentTeal/40"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div ref={hourlyScrollRef} className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-2">
          {hourly.slice(0, 24).map((hour, idx) => {
            const codeInfo = getWeatherCodeInfo(hour.weathercode);
            const HourIcon = codeInfo.icon;
            return (
              <div
                key={idx}
                className="flex-shrink-0 w-24 py-4 rounded-2xl flex flex-col items-center gap-3 transition-all duration-200 hover:bg-white/5 border border-transparent hover:border-white/8 cursor-default"
              >
                <span className="text-xs text-brand-textSecondary font-sans font-medium">{hour.time}</span>
                <div className="p-2 rounded-xl bg-brand-sidebar/55 border border-brand-cardBorder/40">
                  <HourIcon className="w-5 h-5 text-brand-accentTeal" />
                </div>
                <span className="text-sm font-bold text-white font-sans">{Math.round(hour.temp)}°</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Bottom: Radar + Air Quality ───────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Live Radar */}
        <div className="glass-card rounded-[2rem] p-6 flex flex-col justify-between min-h-[300px] relative overflow-hidden group hover:border-brand-accentTeal/20 transition-all duration-300">
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-brand-accentTeal rounded-full shadow-glow-teal animate-pulse" />
                <h3 className="text-sm font-bold text-white font-sans">Live Radar</h3>
              </div>
              <p className="text-xs text-brand-textMuted font-sans">Precipitation</p>
            </div>
            <button className="p-1.5 hover:bg-brand-sidebar rounded-full text-brand-textSecondary hover:text-white transition-colors">
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 rounded-2xl bg-brand-darkBg/80 border border-brand-cardBorder/60 overflow-hidden relative min-h-[160px] flex items-center justify-center">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px]" />
            <div className="absolute w-[200%] h-[200%] bg-gradient-to-tr from-brand-accentTeal/5 via-transparent to-transparent rounded-full animate-[spin_8s_linear_infinite]" style={{ transformOrigin: 'center' }} />
            <svg className="absolute w-full h-full opacity-25" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M 0 50 Q 25 30, 50 50 T 100 50" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" fill="none" />
              <path d="M 0 30 Q 35 10, 70 30 T 100 30" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" fill="none" />
              <path d="M 0 70 Q 15 50, 45 70 T 100 70" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" fill="none" />
            </svg>
            <div className="absolute w-12 h-12 bg-brand-accentTeal/30 rounded-full blur-xl animate-pulse" style={{ top: '25%', left: '40%' }} />
            <div className="absolute w-20 h-16 bg-brand-accentCyan/20 rounded-full blur-2xl" style={{ top: '45%', left: '30%' }} />
            <div className="absolute w-8 h-8 bg-brand-accentTeal/40 rounded-full blur-lg animate-pulse" style={{ top: '35%', left: '60%' }} />
            <div className="absolute bottom-3 left-3 bg-brand-sidebar/90 border border-brand-cardBorder px-3 py-1.5 rounded-xl text-[10px] font-bold text-white flex items-center gap-1.5 shadow-lg font-sans">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accentTeal animate-ping" />
              {current.precipitationProbability > 0 ? `${current.precipitationProbability}% Rain Approaching` : 'No Rain Approaching'}
            </div>
          </div>
        </div>

        {/* Air Quality */}
        <div className="glass-card rounded-[2rem] p-6 flex flex-col justify-between min-h-[300px] hover:border-brand-accentTeal/20 transition-all duration-300">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-sm font-bold text-white font-sans">Air Quality</h3>
            <span className="text-[10px] font-bold tracking-wider text-brand-textMuted uppercase font-sans">Metrics</span>
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* AQI ring */}
            <div className="flex flex-col items-center justify-center relative">
              <div className="w-36 h-36 flex items-center justify-center relative">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="72" cy="72" r="60" stroke="rgba(255,255,255,0.03)" strokeWidth="8" fill="none" />
                  <circle
                    cx="72" cy="72" r="60"
                    stroke="url(#aqi-gradient)" strokeWidth="8" fill="none"
                    strokeDasharray={2 * Math.PI * 60}
                    strokeDashoffset={2 * Math.PI * 60 * (1 - Math.min((airQualityData?.aqi || 42) / 150, 1))}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 0.8s ease' }}
                  />
                  <defs>
                    <linearGradient id="aqi-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00E5FF" />
                      <stop offset="100%" stopColor="#00B0FF" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-4xl font-extrabold font-sans text-white">{airQualityData?.aqi || 42}</span>
                  <span className="text-[9px] text-brand-textMuted uppercase font-sans tracking-widest">AQI Index</span>
                </div>
              </div>
            </div>

            {/* PM2.5 + Ozone bars */}
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-sans">
                  <span className="text-brand-textSecondary">PM2.5</span>
                  <span className="font-semibold text-white">{airQualityData?.pm2_5?.toFixed(1) || '12.4'} μg/m³</span>
                </div>
                <div className="w-full h-1.5 bg-brand-sidebar rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-accentTeal rounded-full transition-all duration-700"
                    style={{ width: `${Math.min(((airQualityData?.pm2_5 || 12.4) / 25) * 100, 100)}%` }}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-sans">
                  <span className="text-brand-textSecondary">Ozone</span>
                  <span className="font-semibold text-white">{airQualityData?.ozone?.toFixed(1) || '48.2'} μg/m³</span>
                </div>
                <div className="w-full h-1.5 bg-brand-sidebar rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-accentCyan rounded-full transition-all duration-700"
                    style={{ width: `${Math.min(((airQualityData?.ozone || 48.2) / 180) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 rounded-2xl bg-brand-sidebar/40 border border-brand-cardBorder/40 text-[11px] text-brand-textSecondary leading-relaxed font-sans">
            {aqiInfo.desc}
          </div>
        </div>

      </div>
    </div>
  );
};
