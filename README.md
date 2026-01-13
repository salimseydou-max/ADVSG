# Multilingual Advice (Expo + React Native)

Production-ready(ish) Expo app scaffold for an iPhone-first “advice” experience with:
- Language selection (50 languages) + persistence
- Category-based advice fetching (Advice Slip API) + offline fallback
- Translation via a Vercel serverless endpoint (`/api/translate`)
- Favorites (AsyncStorage) + native share sheet
- iOS-like light/dark theme support + RTL toggle (Arabic/Hebrew/etc)

## Local development

Install:

```bash
npm install
```

Run:

```bash
npx expo start
```

## Environment variables

Copy the example:

```bash
cp .env.example .env
```

### Translation (important for native)

- **Web**: by default uses same-origin `\/api\/translate` when deployed to Vercel.
- **Native**: set `EXPO_PUBLIC_TRANSLATE_ENDPOINT` to a full URL, e.g. `https://your-app.vercel.app/api/translate`.

## Vercel (Expo Web + serverless translation)

This repo includes:
- `vercel.json` (builds `dist` via `expo export -p web`)
- `api/translate.ts` (serverless translation endpoint)

On Vercel:
- Set **server-side** env vars (optional):
  - `LIBRETRANSLATE_URL` (recommended: point to your own hosted instance)
  - `LIBRETRANSLATE_API_KEY` (if your instance requires it)
- Set **client** env vars:
  - `EXPO_PUBLIC_TRANSLATE_ENDPOINT` (required for native; optional for web)

## Folder structure

- `app/`: Expo Router routes (screens)
- `src/constants/`: languages + categories
- `src/i18n/`: i18n init + UI strings
- `src/services/`: advice API + translation + offline fallback
- `src/storage/`: AsyncStorage helpers (settings + favorites)
- `src/theme/`: theme hook (light/dark)

