# EthiolanguageAI

GitHub Pages-ready frontend for the EthiolanguageAI mobile-friendly language learning app.

## Files

- `index.html` — main application UI and JavaScript
- `manifest.json` — PWA configuration
- `service-worker.js` — offline caching

## GitHub Pages

Upload these files to the repository root. In GitHub, enable Pages from the `main` branch and the repository root.

## Backend

The HTML works in offline mode by default. For full translation/processing, deploy the Flask backend separately and set `API_BASE_URL` near the top of `index.html`.

Do **not** put Google Cloud service-account private keys in `index.html`, GitHub, or browser JavaScript.

## Mobile app

This frontend can also be used as the web/PWA layer for the planned EthiolanguageAI mobile app. A native Expo/React Native app should call the same secure backend rather than storing Google Cloud credentials on the device.
