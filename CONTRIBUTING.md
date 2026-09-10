# Contributing to Aether Weather

Thanks for improving Aether Weather. Keep changes focused, easy to review, and consistent with the existing React/Vite structure.

## Local setup

```bash
git clone https://github.com/Laxmansirvi05/aether-weather.git
cd aether-weather
npm install
npm run dev
```

## Before committing

Run the combined verification command:

```bash
npm run check
```

This runs ESLint and then creates a production build. When changing weather-data handling, also manually verify the affected dashboard or forecast view with several different cities and both supported temperature/wind units.

## Pull requests

- Keep each change focused on one improvement or fix.
- Explain user-facing changes and any API/data assumptions.
- Mention the verification you ran in the pull request description.
- For UI changes, include screenshots when they make the result easier to review.
- Update the README when a feature, setup step, or supported behavior changes.

## Security

Do not commit secrets, API keys, credentials, or local environment files. The Open-Meteo weather, geocoding, and air-quality endpoints used by this project do not require an API key.
