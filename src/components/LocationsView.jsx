import React, { useState, useEffect } from 'react';
import { MapPin, Search, Plus, Trash2, Sun, Cloud, CloudRain, ShieldAlert } from 'lucide-react';
import { getWeatherCodeInfo } from '../utils/weatherUtils';

export const LocationsView = ({ onSelectLocation }) => {
  const [query, setQuery] = useState('');
  const [locations, setLocations] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Initialize with some default cities
  useEffect(() => {
    const defaultCities = [
      { name: 'London', country: 'United Kingdom', lat: 51.5085, lon: -0.1257 },
      { name: 'Reykjavík', country: 'Iceland', lat: 64.1466, lon: -21.9426 },
      { name: 'Tokyo', country: 'Japan', lat: 35.6895, lon: 139.6917 },
      { name: 'New York', country: 'United States', lat: 40.7128, lon: -74.006 },
      { name: 'Sydney', country: 'Australia', lat: -33.8688, lon: 151.2093 }
    ];
    
    // Fetch current weather for each default city to display live data on the cards
    const fetchCityWeather = async () => {
      const updatedLocations = await Promise.all(
        defaultCities.map(async (city) => {
          try {
            const response = await fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true`
            );
            const data = await response.json();
            return {
              ...city,
              temp: data.current_weather.temperature,
              weathercode: data.current_weather.weathercode
            };
          } catch (error) {
            console.error('Error fetching city weather:', error);
            return { ...city, temp: 15, weathercode: 0 };
          }
        })
      );
      setLocations(updatedLocations);
    };

    fetchCityWeather();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim().length < 3) return;
    
    setIsSearching(true);
    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`
      );
      const data = await response.json();
      if (data.results) {
        setSearchResults(data.results);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error searching cities:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleAddCity = async (city) => {
    // Fetch weather for this new city
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current_weather=true`
      );
      const data = await response.json();
      
      const newCity = {
        name: city.name,
        country: city.country,
        lat: city.latitude,
        lon: city.longitude,
        temp: data.current_weather.temperature,
        weathercode: data.current_weather.weathercode
      };

      setLocations((prev) => [...prev, newCity]);
      setSearchResults([]);
      setQuery('');
    } catch (error) {
      console.error('Error adding city:', error);
    }
  };

  const handleRemoveCity = (e, index) => {
    e.stopPropagation(); // Avoid triggering card selection
    setLocations((prev) => prev.filter((_, idx) => idx !== index));
  };

  return (
    <div className="flex-grow overflow-y-auto p-6 space-y-6 flex flex-col h-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white font-sans">Saved Locations</h2>
          <p className="text-xs text-brand-textSecondary font-sans">Track environmental conditions across your favorite hubs</p>
        </div>

        {/* Add Location Search Input */}
        <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-80 relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Add new city..."
            className="flex-1 h-9 pl-3 pr-3 rounded-xl bg-brand-card/60 border border-brand-cardBorder text-xs text-white placeholder-brand-textMuted focus:outline-none focus:border-brand-accentTeal/60 focus:bg-brand-card/85 transition-all duration-200 font-sans"
          />
          <button 
            type="submit"
            className="h-9 px-4 bg-brand-accentTeal hover:opacity-90 text-brand-darkBg font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-opacity duration-150 font-sans shadow-glow-teal"
          >
            <Search className="w-3.5 h-3.5" />
            Search
          </button>

          {/* Search Dropdown Results */}
          {searchResults.length > 0 && (
            <div className="absolute top-10 left-0 right-0 bg-[#0D1525] border border-brand-cardBorder rounded-xl shadow-2xl overflow-hidden z-50">
              <ul>
                {searchResults.map((city) => (
                  <li key={city.id} className="border-b border-brand-cardBorder/40 last:border-b-0">
                    <button
                      type="button"
                      onClick={() => handleAddCity(city)}
                      className="w-full text-left px-4 py-3 hover:bg-brand-card text-[11px] text-brand-textSecondary hover:text-white flex justify-between items-center transition-colors duration-150 font-sans"
                    >
                      <div>
                        <span className="font-semibold text-white">{city.name}</span>
                        {city.admin1 ? `, ${city.admin1}` : ''}
                        {`, ${city.country}`}
                      </div>
                      <Plus className="w-3.5 h-3.5 text-brand-accentTeal" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </form>
      </div>

      {/* Grid of location cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {locations.map((city, idx) => {
          const codeInfo = getWeatherCodeInfo(city.weathercode);
          const WeatherIcon = codeInfo.icon;
          return (
            <div
              key={idx}
              onClick={() => onSelectLocation(city)}
              className="glass-card rounded-[2rem] p-6 flex flex-col justify-between min-h-[160px] cursor-pointer relative overflow-hidden group"
            >
              {/* Card top branding */}
              <div className="flex justify-between items-start">
                <div className="space-y-0.5">
                  <h3 className="text-base font-bold text-white font-sans">{city.name}</h3>
                  <p className="text-[10px] text-brand-textMuted font-sans uppercase tracking-wider">{city.country}</p>
                </div>
                <button
                  onClick={(e) => handleRemoveCity(e, idx)}
                  className="p-1.5 hover:bg-brand-sidebar/80 text-brand-textMuted hover:text-red-400 rounded-full transition-colors relative z-10"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Card bottom weather data */}
              <div className="flex justify-between items-end mt-4">
                <div className="space-y-0.5">
                  <p className="text-3xl font-extrabold text-white font-sans">{Math.round(city.temp)}°</p>
                  <p className="text-[10px] text-brand-textSecondary font-sans">{codeInfo.label}</p>
                </div>
                <div className="p-3 rounded-2xl bg-brand-sidebar border border-brand-cardBorder/60 text-brand-accentTeal group-hover:shadow-glow-teal transition-all duration-300">
                  <WeatherIcon className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
