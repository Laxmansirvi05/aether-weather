import React, { useState } from 'react';
import { Settings, Shield, Bell, Eye, EyeOff } from 'lucide-react';

export const SettingsView = ({ tempUnit, setTempUnit, windUnit, setWindUnit }) => {
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="flex-grow overflow-y-auto p-6 space-y-6 flex flex-col h-full">
      <div>
        <h2 className="text-2xl font-bold text-white font-sans">Settings</h2>
        <p className="text-xs text-brand-textSecondary font-sans">Configure your global weather dashboard environment</p>
      </div>

      <div className="max-w-2xl glass-card rounded-[2rem] p-6 space-y-6">
        
        {/* Unit Settings */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white font-sans border-b border-brand-cardBorder/40 pb-2">Measurement Units</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Temp Selector */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-brand-textMuted uppercase font-sans">Temperature Scale</label>
              <div className="grid grid-cols-2 bg-brand-sidebar border border-brand-cardBorder rounded-xl p-1">
                <button
                  onClick={() => setTempUnit('celsius')}
                  className={`py-1.5 rounded-lg text-xs font-bold font-sans transition-all ${
                    tempUnit === 'celsius' ? 'bg-brand-accentTeal text-brand-darkBg font-extrabold shadow-glow-teal' : 'text-brand-textSecondary hover:text-white'
                  }`}
                >
                  Celsius (°C)
                </button>
                <button
                  onClick={() => setTempUnit('fahrenheit')}
                  className={`py-1.5 rounded-lg text-xs font-bold font-sans transition-all ${
                    tempUnit === 'fahrenheit' ? 'bg-brand-accentTeal text-brand-darkBg font-extrabold shadow-glow-teal' : 'text-brand-textSecondary hover:text-white'
                  }`}
                >
                  Fahrenheit (°F)
                </button>
              </div>
            </div>

            {/* Wind Selector */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-brand-textMuted uppercase font-sans">Wind Speed Units</label>
              <div className="grid grid-cols-2 bg-brand-sidebar border border-brand-cardBorder rounded-xl p-1">
                <button
                  onClick={() => setWindUnit('kmh')}
                  className={`py-1.5 rounded-lg text-xs font-bold font-sans transition-all ${
                    windUnit === 'kmh' ? 'bg-brand-accentTeal text-brand-darkBg font-extrabold shadow-glow-teal' : 'text-brand-textSecondary hover:text-white'
                  }`}
                >
                  Kilometers (km/h)
                </button>
                <button
                  onClick={() => setWindUnit('mph')}
                  className={`py-1.5 rounded-lg text-xs font-bold font-sans transition-all ${
                    windUnit === 'mph' ? 'bg-brand-accentTeal text-brand-darkBg font-extrabold shadow-glow-teal' : 'text-brand-textSecondary hover:text-white'
                  }`}
                >
                  Miles (mph)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Alerts & Safety */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white font-sans border-b border-brand-cardBorder/40 pb-2">Notifications</h3>
          
          <div className="flex items-center justify-between py-2">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-white font-sans">Severe Weather Notifications</span>
              <p className="text-[10px] text-brand-textSecondary font-sans">Receive alerts when thunderstorms or snowfall forecasts are incoming</p>
            </div>
            
            {/* Custom toggle slider */}
            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-11 h-6 rounded-full p-1 transition-colors duration-200 ${
                notifications ? 'bg-brand-accentTeal' : 'bg-brand-sidebar border border-brand-cardBorder'
              }`}
            >
              <div 
                className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                  notifications ? 'transform translate-x-5 bg-brand-darkBg' : ''
                }`} 
              />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
