import { 
  Sun, Cloud, CloudRain, CloudLightning, CloudSnow, 
  CloudDrizzle, Wind, Droplets, Thermometer, Eye, 
  Compass, Gauge, SunDim
} from 'lucide-react';

// Maps WMO codes to weather conditions and visual styling options
export const getWeatherCodeInfo = (code) => {
  const codes = {
    0: {
      label: 'Clear Sky',
      icon: Sun,
      description: 'Clear and sunny',
      gradient: 'from-amber-400 via-orange-400 to-yellow-500',
      glassGradient: 'from-orange-500/20 via-yellow-500/10 to-transparent',
      illustration: 'sun'
    },
    1: {
      label: 'Mainly Clear',
      icon: SunDim,
      description: 'Mostly clear skies',
      gradient: 'from-amber-300 via-blue-400 to-sky-500',
      glassGradient: 'from-amber-500/15 via-blue-500/10 to-transparent',
      illustration: 'sun-cloud'
    },
    2: {
      label: 'Partly Cloudy',
      icon: Cloud,
      description: 'Scattered clouds',
      gradient: 'from-sky-400 via-slate-400 to-brand-accentCyan',
      glassGradient: 'from-yellow-500/10 via-sky-500/15 to-transparent',
      illustration: 'sun-cloud'
    },
    3: {
      label: 'Overcast',
      icon: Cloud,
      description: 'Overcast skies',
      gradient: 'from-slate-400 via-slate-500 to-slate-600',
      glassGradient: 'from-slate-500/10 via-slate-600/15 to-transparent',
      illustration: 'cloud'
    },
    45: {
      label: 'Fog',
      icon: Cloud,
      description: 'Foggy conditions',
      gradient: 'from-zinc-400 via-slate-400 to-zinc-500',
      glassGradient: 'from-zinc-500/10 to-transparent',
      illustration: 'fog'
    },
    48: {
      label: 'Depositing Rime Fog',
      icon: Cloud,
      description: 'Icy fog',
      gradient: 'from-slate-300 via-cyan-600 to-zinc-400',
      glassGradient: 'from-cyan-500/10 to-transparent',
      illustration: 'fog'
    },
    51: {
      label: 'Light Drizzle',
      icon: CloudDrizzle,
      description: 'Light scattered drizzle',
      gradient: 'from-teal-400 via-sky-500 to-indigo-500',
      glassGradient: 'from-teal-500/10 via-sky-500/10 to-transparent',
      illustration: 'cloud-rain'
    },
    53: {
      label: 'Moderate Drizzle',
      icon: CloudDrizzle,
      description: 'Steady drizzle',
      gradient: 'from-teal-500 via-sky-600 to-indigo-600',
      glassGradient: 'from-sky-500/10 to-transparent',
      illustration: 'cloud-rain'
    },
    55: {
      label: 'Heavy Drizzle',
      icon: CloudDrizzle,
      description: 'Heavy drizzle',
      gradient: 'from-cyan-500 via-indigo-600 to-slate-700',
      glassGradient: 'from-cyan-500/15 to-transparent',
      illustration: 'cloud-rain'
    },
    61: {
      label: 'Light Rain',
      icon: CloudRain,
      description: 'Light rain showers',
      gradient: 'from-cyan-400 via-blue-500 to-indigo-600',
      glassGradient: 'from-cyan-500/20 via-indigo-500/10 to-transparent',
      illustration: 'cloud-rain'
    },
    63: {
      label: 'Moderate Rain',
      icon: CloudRain,
      description: 'Steady rain',
      gradient: 'from-blue-500 via-indigo-600 to-slate-800',
      glassGradient: 'from-blue-500/15 to-transparent',
      illustration: 'cloud-rain'
    },
    65: {
      label: 'Heavy Rain',
      icon: CloudRain,
      description: 'Heavy downpour',
      gradient: 'from-blue-600 via-indigo-800 to-slate-900',
      glassGradient: 'from-indigo-500/20 to-transparent',
      illustration: 'cloud-rain'
    },
    71: {
      label: 'Light Snow',
      icon: CloudSnow,
      description: 'Light snowfall',
      gradient: 'from-sky-300 via-blue-400 to-slate-200',
      glassGradient: 'from-sky-300/25 via-blue-500/10 to-transparent',
      illustration: 'snow'
    },
    73: {
      label: 'Moderate Snow',
      icon: CloudSnow,
      description: 'Moderate snowfall',
      gradient: 'from-sky-200 via-cyan-400 to-slate-100',
      glassGradient: 'from-sky-200/20 to-transparent',
      illustration: 'snow'
    },
    75: {
      label: 'Heavy Snowfall',
      icon: CloudSnow,
      description: 'Heavy snowfall',
      gradient: 'from-cyan-300 via-blue-600 to-slate-50',
      glassGradient: 'from-cyan-300/30 to-transparent',
      illustration: 'snow'
    },
    80: {
      label: 'Scattered Showers',
      icon: CloudRain,
      description: 'Scattered rain showers',
      gradient: 'from-cyan-400 via-sky-500 to-blue-600',
      glassGradient: 'from-cyan-500/20 to-transparent',
      illustration: 'cloud-rain'
    },
    81: {
      label: 'Moderate Showers',
      icon: CloudRain,
      description: 'Passing rain showers',
      gradient: 'from-blue-400 via-indigo-500 to-slate-700',
      glassGradient: 'from-blue-500/15 to-transparent',
      illustration: 'cloud-rain'
    },
    82: {
      label: 'Violent Showers',
      icon: CloudRain,
      description: 'Violent rain storms',
      gradient: 'from-indigo-600 via-purple-700 to-slate-900',
      glassGradient: 'from-purple-500/20 to-transparent',
      illustration: 'cloud-rain'
    },
    85: {
      label: 'Light Snow Showers',
      icon: CloudSnow,
      description: 'Light snow showers',
      gradient: 'from-sky-200 via-blue-400 to-slate-200',
      glassGradient: 'from-sky-300/20 to-transparent',
      illustration: 'snow'
    },
    86: {
      label: 'Heavy Snow Showers',
      icon: CloudSnow,
      description: 'Heavy snow storms',
      gradient: 'from-blue-400 via-slate-100 to-sky-300',
      glassGradient: 'from-sky-300/25 to-transparent',
      illustration: 'snow'
    },
    95: {
      label: 'Stormy',
      icon: CloudLightning,
      description: 'Thunderstorms',
      gradient: 'from-purple-600 via-indigo-900 to-brand-darkBg',
      glassGradient: 'from-purple-500/20 via-indigo-900/25 to-transparent',
      illustration: 'storm'
    },
    96: {
      label: 'Stormy with Hail',
      icon: CloudLightning,
      description: 'Thunderstorms with hail',
      gradient: 'from-purple-800 via-slate-800 to-black',
      glassGradient: 'from-purple-500/20 to-transparent',
      illustration: 'storm'
    },
    99: {
      label: 'Severe Stormy with Hail',
      icon: CloudLightning,
      description: 'Severe stormy conditions',
      gradient: 'from-purple-900 via-zinc-900 to-black',
      glassGradient: 'from-purple-900/30 to-transparent',
      illustration: 'storm'
    }
  };

  return codes[code] || {
    label: 'Unknown',
    icon: Cloud,
    description: 'Unknown weather condition',
    gradient: 'from-slate-400 to-slate-600',
    glassGradient: 'from-slate-500/10 to-transparent',
    illustration: 'cloud'
  };
};

export const getWindDirection = (degree) => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degree / 22.5) % 16;
  return directions[index];
};

export const getAQIDescription = (aqi) => {
  if (aqi <= 20) return { label: 'Excellent', color: 'text-emerald-400', bg: 'bg-emerald-400', desc: 'The air quality is considered excellent, and air pollution poses no risk.' };
  if (aqi <= 40) return { label: 'Good', color: 'text-teal-400', bg: 'bg-teal-400', desc: 'The air quality is considered satisfactory, and air pollution poses little or no risk.' };
  if (aqi <= 60) return { label: 'Moderate', color: 'text-amber-400', bg: 'bg-amber-400', desc: 'Air quality is acceptable; however, some pollutants may cause moderate health concerns.' };
  if (aqi <= 80) return { label: 'Poor', color: 'text-orange-400', bg: 'bg-orange-400', desc: 'Members of sensitive groups may experience health effects. The general public is less likely to be affected.' };
  return { label: 'Hazardous', color: 'text-red-500', bg: 'bg-red-500', desc: 'Health alert: everyone may experience more serious health effects. Avoid outdoor activities.' };
};

export const getUVDescription = (uvIndex) => {
  if (uvIndex <= 2) return { label: 'Low', text: 'Low all day' };
  if (uvIndex <= 5) return { label: 'Moderate', text: 'Moderate risk. Seek shade during midday hours' };
  if (uvIndex <= 7) return { label: 'High', text: 'High risk. Protection required, wear sun screen' };
  if (uvIndex <= 10) return { label: 'Very High', text: 'Very high risk. Avoid sun exposure during midday' };
  return { label: 'Extreme', text: 'Extreme risk. Take all precautions, avoid going outdoors' };
};


