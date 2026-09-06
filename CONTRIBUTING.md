# Contributing to Aether Weather

Thanks for improving Aether Weather. Keep changes focused, easy to review, and consistent with the existing React/Vite structure.

## Local setup

```bash
npm install
npm run dev
```

## Before committing

Run the combined check:

```bash
npm run check
```

This runs ESLint and then creates a production build. If you are changing weather-data handling, also manually verify the affected dashboard or forecast view with a few different cities.

## Pull requests

- Keep each change focused on one improvement or fix.
- Explain user-facing changes and any API/data assumptions.
- Do not commit secrets, API keys, or local environment files.
- Update the README when a feature, setup step, or supported behavior changes.
