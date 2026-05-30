import React from 'react';
import { 
  LayoutGrid, Calendar, History, MapPin, 
  Settings, HelpCircle
} from 'lucide-react';

export const Sidebar = ({ activeView, setActiveView }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'forecast', label: '7-Day Forecast', icon: Calendar },
    { id: 'history', label: 'History', icon: History },
    { id: 'locations', label: 'Locations', icon: MapPin },
  ];

  return (
    <aside className="w-64 flex-shrink-0 bg-brand-sidebar/70 backdrop-blur-md border-r border-brand-cardBorder flex flex-col justify-between py-6 px-4 min-h-screen text-brand-textSecondary">
      
      {/* Top Logo / Hub Title */}
      <div className="mb-8 px-2">
        <h1 className="text-xl font-bold text-white font-sans tracking-tight">Aether Weather</h1>
        <p className="text-xs text-brand-textMuted font-sans">Global Forecast</p>
      </div>

      {/* Primary Navigation Menu */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                isActive 
                  ? 'bg-brand-card text-white border-l-2 border-brand-accentTeal shadow-glow-teal' 
                  : 'hover:bg-brand-card/40 hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-brand-accentTeal' : ''}`} />
              <span className="text-sm font-sans">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Actions - Settings, Support */}
      <div className="space-y-4 pt-6 border-t border-brand-cardBorder">
        {/* Footer Navigation */}
        <div className="space-y-1">
          <button 
            onClick={() => setActiveView('settings')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-brand-card/40 hover:text-white transition-all duration-200 ${
              activeView === 'settings' ? 'text-white bg-brand-card/50' : ''
            }`}
          >
            <Settings className="w-5 h-5" />
            <span className="text-sm font-sans">Settings</span>
          </button>
          <button 
            onClick={() => setActiveView('support')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-brand-card/40 hover:text-white transition-all duration-200 ${
              activeView === 'support' ? 'text-white bg-brand-card/50' : ''
            }`}
          >
            <HelpCircle className="w-5 h-5" />
            <span className="text-sm font-sans">Support</span>
          </button>
        </div>
      </div>

    </aside>
  );
};
