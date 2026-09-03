# Aether Weather 🌤️

A modern, responsive weather dashboard built with React that delivers live weather, air-quality, hourly, and 7-day forecast information for cities around the world.

## ✨ Live Demo

**[Aether Weather](https://aether-weather-dun.vercel.app/)**

## 📌 Overview

Aether Weather combines a clean dashboard experience with live data from the Open-Meteo APIs. Search for a city, explore its current conditions, view the upcoming forecast, check air quality, and switch measurement units from the settings panel.

The application uses browser `localStorage` to keep the user's recent city searches available between sessions.

## 🚀 Features

- 🌡️ Real-time temperature and feels-like temperature
- 🌦️ Current weather conditions with day/night awareness
- 💧 Relative humidity
- 💨 Wind speed and direction
- ☀️ UV index and precipitation probability
- 🌫️ European AQI, PM2.5, and ozone information
- 🕐 24-hour hourly weather overview
- 📅 7-day weather forecast
- 🌅 Sunrise and sunset times in the selected location's timezone
- 🔎 City search using Open-Meteo geocoding
- 🕘 Recent city searches stored locally
- 📍 Dedicated locations view
- 📊 Historical climate view with temperature and rainfall visualizations
- ⚙️ Celsius/Fahrenheit and km/h/mph unit settings
- 📱 Responsive dashboard UI
- 🎨 Animated weather illustrations and modern glass-style interface
- 🔄 Automatic weather refresh every 10 minutes
- 🛡️ No weather API key required

## 🛠️ Tech Stack

- **React 19** – UI development
- **Vite** – Development server and production builds
- **Tailwind CSS** – Responsive styling
- **Framer Motion** – UI animations
- **Lucide React** – Interface icons
- **Open-Meteo Weather API** – Weather and forecast data
- **Open-Meteo Geocoding API** – City/location search
- **Open-Meteo Air Quality API** – Air-quality data
- **localStorage** – Recent-search persistence
- **Vercel** – Deployment

## 🔌 APIs Used

### Open-Meteo Weather API

Provides current conditions, hourly data, daily forecasts, temperature, precipitation probability, wind, UV index, sunrise, sunset, and timezone information.

### Open-Meteo Geocoding API

Used to convert a city search into geographic coordinates and location information.

### Open-Meteo Air Quality API

Provides European AQI, PM2.5, and ozone measurements.

All three services are used directly from the frontend and do not require an API key for this project.

## 🖥️ Application Views

- **Dashboard** – Current weather, air quality, and key weather metrics
- **Forecast** – Hourly and 7-day forecast details
- **History** – Historical climate visualizations and summaries
- **Locations** – Browse/select saved or available locations
- **Settings** – Temperature and wind-speed unit preferences
- **Support** – Application support information

## 📸 Screenshots

### Dashboard

<img width="2048" height="1326" alt="Aether Weather dashboard" src="https://github.com/user-attachments/assets/4dc2a3a7-1ccd-4365-8ca6-f9824adef9c0" />

<img width="2048" height="1326" alt="Aether Weather weather dashboard" src="https://github.com/user-attachments/assets/90910b2d-2399-4a3e-8329-d708ed77f842" />

### 7-Day Forecast

<img width="2048" height="1326" alt="Aether Weather 7-day forecast" src="https://github.com/user-attachments/assets/a19e153b-4377-4509-bc2b-c3d05f4f37f3" />

## 📂 Project Structure

```text
src/
├── components/
│   ├── DashboardView.jsx
│   ├── ForecastView.jsx
│   ├── HistoryView.jsx
│   ├── LocationsView.jsx
│   ├── SettingsView.jsx
│   ├── Sidebar.jsx
│   ├── SupportView.jsx
│   ├── TopBar.jsx
│   └── WeatherIllustration.jsx
├── utils/
├── App.jsx
├── index.css
└── main.jsx
```

## ⚡ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Laxmansirvi05/aether-weather.git
cd aether-weather
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Vite will provide the local development URL in the terminal.

### 4. Create a production build

```bash
npm run build
```

### 5. Preview the production build

```bash
npm run preview
```

## 🔐 API Configuration

No API key or `.env` configuration is required for the weather, geocoding, or air-quality APIs used by the application.

## 🧠 What This Project Demonstrates

This project demonstrates practical frontend development concepts including:

- React component architecture
- React state and lifecycle management
- Asynchronous API requests with `fetch`
- URL parameter construction with `URLSearchParams`
- Location geocoding and coordinate-based weather queries
- Loading and error-state handling
- Automatic data refresh with `setInterval`
- Abortable requests using `AbortController`
- Browser localStorage persistence
- Responsive UI development with Tailwind CSS
- Data transformation for dashboard and forecast visualizations

## ⚠️ Notes

The **History** view currently uses predefined climate datasets for its visualizations rather than requesting historical weather data from the API. The displayed historical records and seasonal summaries should therefore be treated as demonstration data.

## 🔮 Future Improvements

- Connect the History view to a real historical-weather data source
- Add automatic browser geolocation
- Add weather alerts and severe-weather notifications
- Add richer forecast charts and precipitation timelines
- Improve accessibility and keyboard navigation
- Add theme customization
- Add more location management options

## 👨‍💻 Author

### Laxman Sirvi

- **GitHub:** https://github.com/Laxmansirvi05
- **LinkedIn:** https://www.linkedin.com/in/laxmansirvi/

## 📄 License

This project is licensed under the **MIT License**.
