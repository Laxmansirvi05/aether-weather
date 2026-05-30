import React from 'react';
import { 
  Compass, Thermometer, Droplets, Wind, Sun, 
  Maximize2, ChevronRight, CloudRain, ShieldAlert
} from 'lucide-react';
import { WeatherIllustration } from './WeatherIllustration';
import { getWeatherCodeInfo, getAQIDescription, getUVDescription } from '../utils/weatherUtils';

export const ForecastView = ({ weatherData, airQualityData, city, isLoading, tempUnit, windUnit, errorMsg }) => {
  if (errorMsg) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-12 text-brand-textSecondary">
        <div className="text-red-400 mb-4 text-center">
          <p className="font-sans text-xl font-semibold mb-2">{errorMsg}</p>
        </div>
      </div>
    );
  }

  if (isLoading || !weatherData) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-12 text-brand-textSecondary">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-accentCyan mb-4"></div>
        <p className="font-sans">Loading forecast for {city}...</p>
      </div>
    );
  }

  const current = weatherData.current;
  const daily = weatherData.daily;
  const aqiInfo = airQualityData ? getAQIDescription(airQualityData.aqi) : { label: 'Good', color: 'text-teal-400', desc: 'Acceptable air quality.' };
  const uvInfo = getUVDescription(current.uvIndex);

  // Helper to format date label
  const getDayLabel = (dateStr, index) => {
    if (index === 0) return { day: 'TODAY', sub: 'Today' };
    const date = new Date(dateStr);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
    const dayNum = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    return { 
      day: `${dayName} ${dayNum}`, 
      sub: `${month} ${dayNum}`
    };
  };

  // Find min and max for range slider mapping
  const overallMin = Math.min(...daily.tempMin);
  const overallMax = Math.max(...daily.tempMax);
  const totalRange = overallMax - overallMin;

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      
      {/* Page Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-brand-textSecondary font-sans">
            <Compass className="w-4 h-4 text-brand-accentTeal animate-pulse" />
            <span className="text-sm font-medium tracking-wide uppercase">{city}</span>
          </div>
          <h2 className="text-5xl font-extrabold text-white tracking-tight font-sans">7-Day Outlook</h2>
        </div>

        {/* Small Current Temp Widget */}
        <div className="glass-card rounded-2xl px-5 py-3 flex items-center gap-3 self-start md:self-auto border border-white/10 shadow-lg">
          <div className="p-2 rounded-xl bg-brand-accentTeal/10 text-brand-accentTeal">
            <Thermometer className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-brand-textMuted font-bold uppercase tracking-wider font-sans">Current Temp</p>
            <p className="text-lg font-bold text-white font-sans">{Math.round(current.temp)}°{tempUnit === 'fahrenheit' ? 'F' : 'C'}</p>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Side: Three Cards + Weekly Progress Rows */}
        <div className="xl:col-span-2 space-y-6">
          
          {/* Top Row: Next 3 Days Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {daily.time.slice(0, 3).map((dateStr, idx) => {
              const dayLabel = getDayLabel(dateStr, idx);
              const codeInfo = getWeatherCodeInfo(daily.weathercode[idx]);
              const CardIcon = codeInfo.icon;
              return (
                <div 
                  key={idx}
                  className="glass-card rounded-[1.5rem] p-5 flex flex-col items-center justify-between text-center min-h-[220px]"
                >
                  <span className="text-xs font-bold text-brand-textSecondary uppercase tracking-wider font-sans">{dayLabel.day}</span>
                  
                  {/* Glassmorphic realistic container for weather icon */}
                  <div className="my-4 relative w-20 h-20 flex items-center justify-center rounded-2xl bg-gradient-to-br from-brand-sidebar to-brand-cardBorder/30 border border-brand-cardBorder">
                    <CardIcon className="w-10 h-10 text-brand-accentTeal filter drop-shadow-[0_0_8px_rgba(0,229,255,0.4)]" />
                  </div>

                  <div className="space-y-1">
                    <p className="text-lg font-extrabold text-white font-sans">
                      {Math.round(daily.tempMax[idx])}° / {Math.round(daily.tempMin[idx])}°
                    </p>
                    <p className="text-xs text-brand-textSecondary font-sans">{codeInfo.label}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Weekly Progress Rows list */}
          <div className="glass-card rounded-[2rem] p-6 space-y-4">
            <h3 className="text-sm font-bold text-brand-textSecondary uppercase tracking-wider mb-2 font-sans">Weekly Range Analysis</h3>
            
            <div className="divide-y divide-brand-cardBorder/40">
              {daily.time.slice(3, 7).map((dateStr, idx) => {
                const adjustedIdx = idx + 3;
                const dayLabel = getDayLabel(dateStr, adjustedIdx);
                const codeInfo = getWeatherCodeInfo(daily.weathercode[adjustedIdx]);
                const DayIcon = codeInfo.icon;
                const precipProb = daily.precipitationProbability[adjustedIdx];

                const minTemp = daily.tempMin[adjustedIdx];
                const maxTemp = daily.tempMax[adjustedIdx];

                // Calculate slider percentages
                const leftPercent = ((minTemp - overallMin) / totalRange) * 100;
                const rightPercent = ((maxTemp - overallMin) / totalRange) * 100;
                const widthPercent = rightPercent - leftPercent;

                return (
                  <div 
                    key={adjustedIdx}
                    className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-4"
                  >
                    {/* Date label */}
                    <div className="w-24 flex-shrink-0">
                      <p className="text-xs font-bold text-white font-sans">{dayLabel.day}</p>
                      <p className="text-[10px] text-brand-textMuted font-sans">{dayLabel.sub}</p>
                    </div>

                    {/* Condition details */}
                    <div className="flex items-center gap-3 w-44">
                      <div className="p-2 rounded-xl bg-brand-sidebar border border-brand-cardBorder text-brand-accentTeal">
                        <DayIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white font-sans">{codeInfo.label}</p>
                        {precipProb > 0 && (
                          <p className="text-[10px] text-brand-textSecondary font-sans flex items-center gap-1">
                            <Droplets className="w-3 h-3 text-brand-accentTeal" />
                            {precipProb}%
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Horizontal Range Slider Indicator */}
                    <div className="flex-1 flex items-center gap-3">
                      <span className="text-xs font-semibold text-brand-textSecondary w-8 text-right font-sans">
                        {Math.round(minTemp)}°
                      </span>
                      
                      <div className="flex-1 h-2 bg-brand-sidebar/80 rounded-full relative overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-brand-accentTeal to-brand-accentCyan rounded-full absolute"
                          style={{ 
                            left: `${leftPercent}%`, 
                            width: `${Math.max(widthPercent, 5)}%` 
                          }}
                        />
                      </div>

                      <span className="text-xs font-semibold text-white w-8 font-sans">
                        {Math.round(maxTemp)}°
                      </span>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Side: Radar widget + Wind/AQI/UV metrics */}
        <div className="space-y-6">
          
          {/* Radar Map & Next Hour chart */}
          <div className="glass-card rounded-[2rem] p-5 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-xs font-bold text-white font-sans">Precipitation</h4>
                <p className="text-[10px] text-brand-textMuted font-sans">Real-time Radar Map</p>
              </div>
              <Maximize2 className="w-4 h-4 text-brand-textSecondary cursor-pointer hover:text-white" />
            </div>

            {/* Simulated mini radar map */}
            <div className="h-32 rounded-xl bg-brand-darkBg/95 border border-brand-cardBorder/60 relative overflow-hidden flex items-center justify-center">
              {/* Radar Grid background */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:12px_12px]" />
              <div className="absolute w-[200%] h-[200%] bg-gradient-to-tr from-brand-accentTeal/5 via-transparent to-transparent rounded-full animate-[spin_10s_linear_infinite]" style={{ transformOrigin: 'center' }} />
              
              {/* Radar Dots */}
              <div className="absolute w-10 h-10 bg-brand-accentTeal/20 rounded-full blur-lg animate-pulse" style={{ top: '20%', left: '35%' }} />
              <div className="absolute w-16 h-12 bg-brand-accentCyan/15 rounded-full blur-xl" style={{ top: '40%', left: '40%' }} />

              <div className="absolute bottom-2 left-2 bg-brand-sidebar/95 border border-brand-cardBorder px-2 py-1 rounded-[8px] text-[9px] font-bold text-white flex items-center gap-1 shadow-md font-sans">
                <span className="w-1 h-1 rounded-full bg-brand-accentTeal animate-ping" />
                LIVE RADAR
              </div>
            </div>

            {/* Next Hour bar chart simulation */}
            <div className="space-y-2 pt-2 border-t border-brand-cardBorder/40">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-brand-textMuted font-sans">
                <span>Next Hour</span>
                <span className="text-white normal-case font-normal">
                  {current.precipitationProbability > 0 ? `${current.precipitationProbability}% chance of rain` : 'No rain expected'}
                </span>
              </div>
              <div className="h-6 flex items-end gap-1 px-1">
                {[10, 15, 10, 20, 30, 45, 60, 40, 20, 10, 5, 5].map((val, idx) => {
                  const chance = current.precipitationProbability;
                  const factor = chance > 0 ? (chance / 100) : 0;
                  const activeHeight = val * factor;
                  return (
                    <div key={idx} className="flex-1 h-full bg-brand-sidebar/45 rounded-sm relative overflow-hidden">
                      <div 
                        className="w-full bg-brand-accentTeal rounded-sm absolute bottom-0 transition-all duration-300"
                        style={{ height: `${activeHeight}%` }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Wind & AQI horizontal metrics cards */}
          <div className="grid grid-cols-2 gap-4">
            {/* Wind Card */}
            <div className="glass-card rounded-[1.5rem] p-4 flex flex-col justify-between h-[115px]">
              <div className="flex justify-between items-center text-brand-textMuted">
                <span className="text-[9px] font-bold tracking-wider uppercase font-sans">Wind</span>
                <Wind className="w-4 h-4 text-brand-accentTeal" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-baseline gap-0.5">
                  <span className="text-2xl font-bold font-sans text-white">{Math.round(current.windSpeed)}</span>
                  <span className="text-xs text-brand-textMuted font-sans">{windUnit === 'mph' ? 'mph' : 'km/h'}</span>
                </div>
                <p className="text-[10px] text-brand-textSecondary font-sans">Dir: {current.windDirectionText}</p>
              </div>
            </div>

            {/* AQI Card */}
            <div className="glass-card rounded-[1.5rem] p-4 flex flex-col justify-between h-[115px]">
              <div className="flex justify-between items-center text-brand-textMuted">
                <span className="text-[9px] font-bold tracking-wider uppercase font-sans">AQI</span>
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded bg-brand-accentTeal/10 ${aqiInfo.color} font-sans`}>
                  {aqiInfo.label}
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="text-2xl font-bold font-sans text-white">{airQualityData?.aqi || 42}</span>
                <p className="text-[10px] text-brand-textSecondary font-sans">Satisfactory</p>
              </div>
            </div>
          </div>

          {/* UV Index Circular gauge card */}
          <div className="glass-card rounded-[2rem] p-5 flex flex-col justify-between h-[180px]">
            <div className="flex justify-between items-center text-brand-textMuted">
              <span className="text-[9px] font-bold tracking-wider uppercase font-sans">UV Index</span>
              <Sun className="w-4 h-4 text-brand-accentTeal" />
            </div>

            <div className="flex-1 grid grid-cols-2 gap-4 items-center">
              <div>
                <p className="text-4xl font-extrabold text-white font-sans">{current.uvIndex}</p>
                <p className="text-[10px] text-brand-textSecondary leading-normal font-sans pt-1">
                  {uvInfo.text}
                </p>
              </div>

              {/* Mini circular gauge */}
              <div className="w-24 h-24 flex items-center justify-center relative justify-self-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="48" cy="48" r="36" stroke="rgba(255,255,255,0.03)" strokeWidth="5" fill="none" />
                  <circle 
                    cx="48" 
                    cy="48" 
                    r="36" 
                    stroke="#00E5FF" 
                    strokeWidth="5" 
                    fill="none" 
                    strokeDasharray={2 * Math.PI * 36} 
                    strokeDashoffset={2 * Math.PI * 36 * (1 - Math.min(current.uvIndex / 12, 1))} 
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-xs font-bold text-white font-sans">{uvInfo.label}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
