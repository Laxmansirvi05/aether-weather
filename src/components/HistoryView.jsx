import React, { useState } from 'react';
import { BarChart, Calendar, TrendingUp, CloudRain, Sun, Thermometer } from 'lucide-react';

export const HistoryView = ({ city }) => {
  const [activeChart, setActiveChart] = useState('temp');

  const months = ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'];
  
  // Custom climate datasets
  const data = {
    temp: {
      high: [6, 8, 11, 14, 18, 22],
      low: [1, 2, 4, 6, 9, 13],
      color: '#00E5FF',
      subcolor: '#00B0FF',
      label: 'Avg Temperature Range (°C)'
    },
    rain: {
      inches: [62, 54, 45, 52, 40, 35],
      color: '#4facfe',
      subcolor: '#00f2fe',
      label: 'Avg Monthly Rainfall (mm)'
    }
  };

  // Find max value in rain to compute bar heights
  const maxRain = Math.max(...data.rain.inches);

  return (
    <div className="flex-grow overflow-y-auto p-6 space-y-6 flex flex-col h-full">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white font-sans">Historical Climate</h2>
          <p className="text-xs text-brand-textSecondary font-sans">Past 6-months meteorological records for {city}</p>
        </div>

        <div className="flex bg-brand-sidebar border border-brand-cardBorder rounded-xl p-1 shadow-md">
          <button
            onClick={() => setActiveChart('temp')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold font-sans transition-all flex items-center gap-1.5 ${
              activeChart === 'temp'
                ? 'bg-brand-accentTeal text-brand-darkBg shadow-glow-teal'
                : 'text-brand-textSecondary hover:text-white'
            }`}
          >
            <Thermometer className="w-3.5 h-3.5" />
            Temperature
          </button>
          <button
            onClick={() => setActiveChart('rain')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold font-sans transition-all flex items-center gap-1.5 ${
              activeChart === 'rain'
                ? 'bg-brand-accentTeal text-brand-darkBg shadow-glow-teal'
                : 'text-brand-textSecondary hover:text-white'
            }`}
          >
            <CloudRain className="w-3.5 h-3.5" />
            Rainfall
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Chart Card */}
        <div className="lg:col-span-2 glass-card rounded-[2rem] p-6 flex flex-col justify-between min-h-[380px]">
          <div>
            <h3 className="text-sm font-bold text-white font-sans">{data[activeChart].label}</h3>
            <p className="text-[10px] text-brand-textMuted font-sans">Monthly averages based on 10-year historical models</p>
          </div>

          {/* SVG Graphs */}
          <div className="flex-1 min-h-[220px] relative mt-6 flex items-end justify-center">
            
            {/* Background Grid Lines */}
            <div className="absolute inset-x-0 inset-y-2 flex flex-col justify-between pointer-events-none opacity-20">
              <div className="w-full border-t border-dashed border-white" />
              <div className="w-full border-t border-dashed border-white" />
              <div className="w-full border-t border-dashed border-white" />
              <div className="w-full border-t border-dashed border-white" />
            </div>

            {activeChart === 'temp' ? (
              /* Temperature Range line chart */
              <svg className="w-full h-full pt-4" viewBox="0 0 600 200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="temp-grad-high" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Fill Area between high & low */}
                <path 
                  d="M 50 140 Q 150 120, 250 90 T 450 40 T 550 20 L 550 180 L 450 150 L 350 130 L 250 120 L 150 150 L 50 180 Z" 
                  fill="url(#temp-grad-high)" 
                />

                {/* High Temp Line */}
                <path 
                  d="M 50 140 Q 150 120, 250 90 T 450 40 T 550 20" 
                  fill="none" 
                  stroke="#00E5FF" 
                  strokeWidth="3" 
                  strokeLinecap="round"
                />

                {/* Low Temp Line */}
                <path 
                  d="M 50 180 Q 150 150, 250 120 T 450 70 T 550 50" 
                  fill="none" 
                  stroke="#00B0FF" 
                  strokeWidth="2.5" 
                  strokeLinecap="round"
                />

                {/* Data Points */}
                {[
                  { x: 50, y: 140, val: 6 }, { x: 150, y: 120, val: 8 }, 
                  { x: 250, y: 90, val: 11 }, { x: 350, y: 60, val: 14 }, 
                  { x: 450, y: 40, val: 18 }, { x: 550, y: 20, val: 22 }
                ].map((pt, idx) => (
                  <g key={idx} className="cursor-pointer group">
                    <circle cx={pt.x} cy={pt.y} r="5" fill="#00E5FF" stroke="#0D131F" strokeWidth="2" />
                    <text x={pt.x} y={pt.y - 10} fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle" className="opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                      {pt.val}°
                    </text>
                  </g>
                ))}
              </svg>
            ) : (
              /* Rainfall Bar Chart */
              <div className="w-full h-full flex justify-between items-end px-6 pt-4">
                {data.rain.inches.map((val, idx) => {
                  const percentHeight = (val / maxRain) * 100;
                  return (
                    <div key={idx} className="flex flex-col items-center gap-2 flex-grow mx-4 group cursor-pointer">
                      <span className="text-[10px] font-bold text-brand-accentTeal opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                        {val}mm
                      </span>
                      <div className="w-full bg-brand-sidebar border border-brand-cardBorder/40 rounded-t-lg relative overflow-hidden" style={{ height: `${percentHeight * 1.5}px` }}>
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-accentCyan to-brand-accentTeal rounded-t-lg transition-transform duration-300 transform origin-bottom hover:scale-y-105" />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Month Labels under chart */}
          <div className="flex justify-between px-6 pt-4 text-xs font-bold text-brand-textMuted font-sans uppercase">
            {months.map((m) => <span key={m}>{m}</span>)}
          </div>
        </div>

        {/* Right side stats column */}
        <div className="space-y-6">
          
          {/* Summary KPI Card */}
          <div className="glass-card rounded-[2rem] p-5 flex flex-col justify-between h-[180px]">
            <div className="flex justify-between items-start text-brand-textMuted">
              <span className="text-[9px] font-bold tracking-wider uppercase font-sans">Seasonal Summary</span>
              <TrendingUp className="w-4 h-4 text-brand-accentTeal" />
            </div>

            <div className="space-y-3">
              <h4 className="text-xl font-extrabold text-white font-sans">Transitioning to Summer</h4>
              <p className="text-xs text-brand-textSecondary leading-normal font-sans">
                {city} has seen a 14% decrease in precipitation probability compared to the winter average, with mean temperatures rising by 3.2°C per month.
              </p>
            </div>
          </div>

          {/* Record High / Low Widget */}
          <div className="glass-card rounded-[2rem] p-5 flex flex-col justify-between h-[180px]">
            <div className="flex justify-between items-start text-brand-textMuted">
              <span className="text-[9px] font-bold tracking-wider uppercase font-sans">Historical Records</span>
              <Calendar className="w-4 h-4 text-brand-accentTeal" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-2xl bg-brand-sidebar border border-brand-cardBorder">
                <span className="text-[9px] font-bold uppercase tracking-wider text-brand-textMuted font-sans">Max Record</span>
                <p className="text-2xl font-extrabold text-white font-sans mt-1">34.2°C</p>
                <p className="text-[9px] text-brand-textSecondary font-sans">July 2021</p>
              </div>

              <div className="p-3 rounded-2xl bg-brand-sidebar border border-brand-cardBorder">
                <span className="text-[9px] font-bold uppercase tracking-wider text-brand-textMuted font-sans">Min Record</span>
                <p className="text-2xl font-extrabold text-white font-sans mt-1">-12.8°C</p>
                <p className="text-[9px] text-brand-textSecondary font-sans">Jan 2018</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
