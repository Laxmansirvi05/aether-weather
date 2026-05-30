import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { DashboardView } from './components/DashboardView';
import { ForecastView } from './components/ForecastView';
import { HistoryView } from './components/HistoryView';
import { LocationsView } from './components/LocationsView';
import { SettingsView } from './components/SettingsView';
import { SupportView } from './components/SupportView';
import { getWindDirection } from './utils/weatherUtils';

// ─── Open-Meteo API endpoints (no API key required) ────────────────────────
const GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WX_URL  = 'https://api.open-meteo.com/v1/forecast';
const AQI_URL = 'https://air-quality-api.open-meteo.com/v1/air-quality';

// ─── Persist recent searches in localStorage ─────────────────────────────
const RECENT_KEY = 'aether_recent_searches';
const loadRecent = () => {
  try { return JSON.parse(localStorage.getItem(RECENT_KEY) || '[]'); }
  catch { return []; }
};
const saveRecent = (list) => {
  try { localStorage.setItem(RECENT_KEY, JSON.stringify(list)); } catch {}
};

export default function App() {
  const [activeView, setActiveView]     = useState('dashboard');
  const [currentCity, setCurrentCity]   = useState({
    name: 'London', country: 'United Kingdom',
    lat: 51.5085, lon: -0.1257,
  });
  const [tempUnit, setTempUnit]         = useState('celsius');
  const [windUnit, setWindUnit]         = useState('kmh');
  const [weatherData, setWeatherData]   = useState(null);
  const [airQualityData, setAirQuality] = useState(null);
  const [isLoading, setIsLoading]       = useState(true);
  const [errorMsg, setErrorMsg]         = useState(null);
  const [recentSearches, setRecent]     = useState(loadRecent);

  // ── Fetch weather + AQI whenever city / unit changes ───────────────────
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchAll = async (retries = 1) => {
      // Only set loading true if we don't have weather data (initial load)
      // or if we are actively searching a new city (handled in handleCitySearch)
      if (!weatherData) setIsLoading(true);
      setErrorMsg(null);
      try {
        const { lat, lon } = currentCity;
        const tempParam = tempUnit === 'fahrenheit' ? 'fahrenheit' : 'celsius';
        const windParam = windUnit === 'mph' ? 'mph' : 'kmh';

        // 1. Weather forecast ─────────────────────────────────────────────
        const wxParams = new URLSearchParams({
          latitude:  lat,
          longitude: lon,
          current: [
            'temperature_2m', 'relative_humidity_2m', 'apparent_temperature',
            'precipitation_probability', 'weather_code', 'wind_speed_10m',
            'wind_direction_10m', 'uv_index', 'is_day',
          ].join(','),
          hourly: ['temperature_2m', 'weather_code', 'precipitation_probability'].join(','),
          daily: [
            'weather_code', 'temperature_2m_max', 'temperature_2m_min',
            'precipitation_probability_max', 'uv_index_max',
            'sunrise', 'sunset',
          ].join(','),
          temperature_unit: tempParam,
          wind_speed_unit:  windParam,
          timezone:         'auto',
          forecast_days:    '7',
        });

        const wxRes = await fetch(`${WX_URL}?${wxParams}`, { signal });
        if (!wxRes.ok) throw new Error(`Weather API error: ${wxRes.status}`);
        const wx = await wxRes.json();

        // 2. Air quality ──────────────────────────────────────────────────
        const aqParams = new URLSearchParams({
          latitude: lat, longitude: lon,
          current: 'european_aqi,pm2_5,ozone',
          timezone: 'auto',
        });
        const aqRes = await fetch(`${AQI_URL}?${aqParams}`, { signal });
        let aqData = null;
        if (aqRes.ok) aqData = await aqRes.json();

        // ── Process current ───────────────────────────────────────────
        const cur = wx.current;
        const nowStr  = cur.time.substring(0, 13);
        const nowIdx  = wx.hourly.time.findIndex(t => t.startsWith(nowStr));
        const startIdx = nowIdx >= 0 ? nowIdx : 0;

        const hourlySlice = wx.hourly.time
          .slice(startIdx, startIdx + 24)
          .map((t, i) => {
            const absIdx = startIdx + i;
            const date = new Date(t);
            return {
              time: i === 0 ? 'Now' : date.toLocaleTimeString('en-US', {
                hour: '2-digit', minute: '2-digit', hour12: false,
              }),
              temp:        wx.hourly.temperature_2m[absIdx],
              weathercode: wx.hourly.weather_code[absIdx],
            };
          });

        // Format sunrise / sunset for display (use city local time via timezone)
        const fmtTime = (isoStr) => {
          if (!isoStr) return '--';
          const d = new Date(isoStr);
          return d.toLocaleTimeString('en-US', {
            hour: '2-digit', minute: '2-digit', hour12: true,
            timeZone: wx.timezone,
          });
        };

        const formattedWeather = {
          current: {
            temp:                     cur.temperature_2m,
            feelsLike:                cur.apparent_temperature,
            weathercode:              cur.weather_code,
            windSpeed:                cur.wind_speed_10m,
            windDirection:            cur.wind_direction_10m,
            windDirectionText:        getWindDirection(cur.wind_direction_10m),
            humidity:                 cur.relative_humidity_2m,
            uvIndex:                  Math.round(cur.uv_index ?? 0),
            precipitationProbability: cur.precipitation_probability ?? 0,
            isDay:                    cur.is_day === 1,
          },
          hourly: hourlySlice,
          daily: {
            time:                     wx.daily.time,
            tempMax:                  wx.daily.temperature_2m_max,
            tempMin:                  wx.daily.temperature_2m_min,
            weathercode:              wx.daily.weather_code,
            precipitationProbability: wx.daily.precipitation_probability_max,
            sunrise:                  (wx.daily.sunrise  || []).map(fmtTime),
            sunset:                   (wx.daily.sunset   || []).map(fmtTime),
          },
          timezone: wx.timezone,
        };

        // ── Process AQI ───────────────────────────────────────────────
        let formattedAQ = { aqi: 42, pm2_5: 0, ozone: 0 };
        if (aqData?.current) {
          formattedAQ = {
            aqi:   aqData.current.european_aqi ?? 42,
            pm2_5: aqData.current.pm2_5        ?? 0,
            ozone: aqData.current.ozone        ?? 0,
          };
        }

        setWeatherData(formattedWeather);
        setAirQuality(formattedAQ);
        setIsLoading(false);
      } catch (err) {
        if (err.name === 'AbortError') return;
        
        if (retries > 0) {
          console.warn(`Weather fetch failed, retrying... (${retries} retries left)`);
          setTimeout(() => fetchAll(retries - 1), 1000);
          return;
        }

        console.error('Weather fetch error:', err);
        setErrorMsg('Unable to fetch live weather. Please check your internet connection.');
        setIsLoading(false);
      }
    };

    fetchAll();
    const interval = setInterval(fetchAll, 600_000);
    return () => { controller.abort(); clearInterval(interval); };
  }, [currentCity, tempUnit, windUnit]);

  // ── Resolve 2-letter country code → full name ─────────────────────────
  const resolveCountryName = (code) => {
    if (!code || code.length !== 2) return code;
    try { return new Intl.DisplayNames(['en'], { type: 'region' }).of(code) || code; }
    catch { return code; }
  };

  // ── Geocode a city name via Open-Meteo ───────────────────────────────
  const geocodeCity = async (query, count = 5) => {
    const params = new URLSearchParams({ name: query, count, language: 'en', format: 'json' });
    const res = await fetch(`${GEO_URL}?${params}`);
    if (!res.ok) return [];
    const data = await res.json();
    return data.results ?? [];
  };

  // ── Push a searched city to recent list (localStorage) ───────────────
  const pushRecent = (name) => {
    setRecent(prev => {
      const next = [name, ...prev.filter(r => r.toLowerCase() !== name.toLowerCase())].slice(0, 5);
      saveRecent(next);
      return next;
    });
  };

  // ── Handle city search ───────────────────────────────────────────────
  const handleCitySearch = async (searchTarget) => {
    if (typeof searchTarget === 'string') {
      try {
        setErrorMsg(null);
        setIsLoading(true);

        let results = await geocodeCity(searchTarget);
        if (!results.length) {
          const firstWord = searchTarget.trim().split(/[\s,]+/)[0];
          if (firstWord && firstWord !== searchTarget.trim()) {
            results = await geocodeCity(firstWord);
          }
        }
        if (!results.length) {
          setErrorMsg('Location not found. Try a nearby city name.');
          setIsLoading(false);
          return;
        }

        const best = results.reduce((a, b) =>
          (b.population ?? 0) > (a.population ?? 0) ? b : a
        , results[0]);

        const countryFull   = resolveCountryName(best.country_code) || best.country;
        const displayCountry = best.name === countryFull ? '' : countryFull;

        setCurrentCity({
          name:    best.name,
          country: displayCountry || best.country || '',
          lat:     best.latitude,
          lon:     best.longitude,
        });
        pushRecent(best.name);
        setActiveView('dashboard');
      } catch (err) {
        console.error('Geocoding error:', err);
        setErrorMsg('Location not found.');
        setIsLoading(false);
      }
    } else {
      const countryFull   = resolveCountryName(searchTarget.country_code) || searchTarget.country;
      const displayCountry = searchTarget.name === countryFull ? '' : countryFull;
      setCurrentCity({
        name:    searchTarget.name,
        country: displayCountry || searchTarget.country || '',
        lat:     searchTarget.latitude, // Fixed from searchTarget.lat
        lon:     searchTarget.longitude, // Fixed from searchTarget.lon
      });
      pushRecent(searchTarget.name);
      setActiveView('dashboard');
    }
  };

  // ── Render view ───────────────────────────────────────────────────────
  const renderMainContent = () => {
    const cityLabel = currentCity.country
      ? `${currentCity.name}, ${currentCity.country}`
      : currentCity.name;

    const sharedProps = {
      weatherData, airQualityData,
      city: cityLabel, isLoading, tempUnit, windUnit, errorMsg,
    };

    switch (activeView) {
      case 'dashboard': return <DashboardView {...sharedProps} />;
      case 'forecast':  return <ForecastView  {...sharedProps} />;
      case 'history':   return <HistoryView    city={currentCity.name} />;
      case 'locations': return <LocationsView  onSelectLocation={handleCitySearch} />;
      case 'settings':
        return (
          <SettingsView
            tempUnit={tempUnit} setTempUnit={setTempUnit}
            windUnit={windUnit}  setWindUnit={setWindUnit}
          />
        );
      case 'support': return <SupportView />;
      default:        return <DashboardView {...sharedProps} />;
    }
  };

  return (
    <div className="min-h-screen flex bg-brand-darkBg font-sans overflow-hidden">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <TopBar
          activeView={activeView}
          setActiveView={setActiveView}
          onSearch={handleCitySearch}
          currentCity={currentCity.name}
          recentSearches={recentSearches}
        />
        <main className="flex-1 overflow-y-auto flex flex-col bg-transparent">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
}
