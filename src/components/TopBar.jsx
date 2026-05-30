import React, { useState, useEffect, useRef } from 'react';
import { Search, Clock, X } from 'lucide-react';

export const TopBar = ({ activeView, setActiveView, onSearch, currentCity, recentSearches = [] }) => {
  const [searchQuery, setSearchQuery]       = useState('');
  const [suggestions, setSuggestions]       = useState([]);
  const [showDropdown, setShowDropdown]     = useState(false);
  const [isSearching, setIsSearching]       = useState(false);
  const searchRef  = useRef(null);
  const inputRef   = useRef(null);
  const [currentTime, setCurrentTime]       = useState(new Date());

  // Tick clock every minute
  useEffect(() => {
    const t = setInterval(() => setCurrentTime(new Date()), 60_000);
    return () => clearInterval(t);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Debounced geocoding suggestions
  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSuggestions([]);
      return;
    }
    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchQuery)}&count=6&language=en&format=json`
        );
        const data = await res.json();
        setSuggestions(data.results ?? []);
      } catch {
        setSuggestions([]);
      } finally {
        setIsSearching(false);
      }
    }, 280);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const commit = (query) => {
    const q = typeof query === 'string' ? query.trim() : query;
    if (!q) return;
    onSearch(q);
    setSearchQuery('');
    setSuggestions([]);
    setShowDropdown(false);
    inputRef.current?.blur();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    commit(searchQuery);
  };

  const handleSelectSuggestion = (city) => {
    onSearch(city);
    setSearchQuery('');
    setSuggestions([]);
    setShowDropdown(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setShowDropdown(false);
      inputRef.current?.blur();
    }
  };

  // What to show in the dropdown
  const showRecent    = searchQuery.trim().length < 2 && recentSearches.length > 0;
  const showSuggests  = searchQuery.trim().length >= 2;
  const dropdownOpen  = showDropdown && (showRecent || showSuggests || isSearching);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'history',   label: 'History'   },
    { id: 'locations', label: 'Locations' },
  ];

  return (
    <header className="h-16 border-b border-brand-cardBorder px-6 flex items-center justify-between bg-brand-sidebar/30 backdrop-blur-md sticky top-0 z-50">

      {/* Branding */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <svg className="w-6 h-6 text-brand-accentTeal" viewBox="0 0 24 24" fill="none">
          <path d="M19.36 10.04C18.67 6.59 15.64 4 12 4C9.11 4 6.6 5.64 5.35 8.04C2.34 8.36 0 10.91 0 14C0 17.31 2.69 20 6 20H19C21.76 20 24 17.76 24 15C24 12.36 21.95 10.22 19.36 10.04Z" fill="currentColor" fillOpacity="0.15" />
          <path d="M19.36 10.04C18.67 6.59 15.64 4 12 4C9.11 4 6.6 5.64 5.35 8.04C2.34 8.36 0 10.91 0 14C0 17.31 2.69 20 6 20H19C21.76 20 24 17.76 24 15C24 12.36 21.95 10.22 19.36 10.04ZM19 18H6C3.79 18 2 16.21 2 14C2 11.95 3.53 10.24 5.56 10.03L6.63 9.92L7.13 8.97C8.08 7.14 9.94 6 12 6C14.62 6 16.88 7.86 17.39 10.43L17.69 11.93L19.22 12.04C20.78 12.14 22 13.45 22 15C22 16.65 20.65 18 19 18Z" fill="currentColor" />
        </svg>
        <span className="font-bold text-lg text-white font-sans tracking-tight">Aether Weather</span>
      </div>

      {/* Nav tabs */}
      <nav className="hidden md:flex items-center gap-6">
        {navItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`text-sm font-medium transition-all duration-200 py-1.5 border-b-2 font-sans relative ${
                isActive
                  ? 'text-white border-brand-accentTeal font-semibold'
                  : 'text-brand-textSecondary border-transparent hover:text-white hover:border-white/20'
              }`}
            >
              {item.label}
              {isActive && (
                <span className="absolute bottom-[-2px] left-0 right-0 h-[2px] bg-brand-accentTeal blur-[2px]" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Right: Search + Clock */}
      <div className="flex items-center gap-4">

        {/* Search */}
        <div ref={searchRef} className="relative w-56 sm:w-72">
          <form onSubmit={handleSubmit} className="relative">
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setShowDropdown(true); }}
              onFocus={() => setShowDropdown(true)}
              onKeyDown={handleKeyDown}
              placeholder={`Search cities...`}
              className="w-full h-10 pl-10 pr-8 rounded-2xl bg-brand-darkBg/60 border border-brand-cardBorder/40 text-sm text-white placeholder-brand-textSecondary focus:outline-none focus:border-brand-accentTeal/80 focus:bg-brand-card/90 transition-all duration-300 font-sans shadow-sm"
            />
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-brand-accentTeal/80 pointer-events-none" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => { setSearchQuery(''); setSuggestions([]); inputRef.current?.focus(); }}
                className="absolute right-3 top-3 w-4 h-4 text-brand-textMuted hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </form>

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute top-12 left-0 right-0 bg-[#0c1422] border border-brand-cardBorder rounded-2xl shadow-2xl overflow-hidden z-50">

              {/* Recent searches */}
              {showRecent && (
                <>
                  <div className="px-4 pt-3 pb-1 text-[10px] font-bold uppercase tracking-widest text-brand-textMuted font-sans">
                    Recent
                  </div>
                  <ul>
                    {recentSearches.map((name) => (
                      <li key={name}>
                        <button
                          onClick={() => commit(name)}
                          className="w-full text-left px-4 py-2.5 hover:bg-brand-card text-sm text-brand-textSecondary hover:text-white transition-colors duration-150 font-sans flex items-center gap-3"
                        >
                          <Clock className="w-3.5 h-3.5 text-brand-textMuted flex-shrink-0" />
                          {name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {/* Live suggestions */}
              {showSuggests && (
                <>
                  {isSearching ? (
                    <div className="px-4 py-3 flex items-center gap-2 text-[11px] text-brand-textMuted font-sans">
                      <div className="w-3 h-3 border border-brand-accentTeal/40 border-t-brand-accentTeal rounded-full animate-spin" />
                      Searching…
                    </div>
                  ) : suggestions.length === 0 ? (
                    <div className="px-4 py-3 text-[11px] text-brand-textMuted font-sans">No results found</div>
                  ) : (
                    <ul>
                      {suggestions.map((city) => (
                        <li key={`${city.id}-${city.name}`}>
                          <button
                            onClick={() => handleSelectSuggestion(city)}
                            className="w-full text-left px-4 py-2.5 hover:bg-brand-card text-[12px] text-brand-textSecondary hover:text-white transition-colors duration-150 font-sans flex items-center gap-2"
                          >
                            <Search className="w-3 h-3 text-brand-textMuted flex-shrink-0" />
                            <span>
                              <span className="font-semibold text-white">{city.name}</span>
                              {city.admin1 ? `, ${city.admin1}` : ''}
                              {`, ${city.country}`}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        {/* Clock */}
        <div className="flex flex-col items-end mr-1 flex-shrink-0">
          <span className="text-sm font-semibold text-white tracking-wide font-sans">
            {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
          </span>
          <span className="text-[10px] text-brand-textSecondary font-medium uppercase tracking-wider font-sans">
            {currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </span>
        </div>

      </div>
    </header>
  );
};
