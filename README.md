# Pathomphorn Lengsudjai — Portfolio

Backend Dev / AI Engineer portfolio with a real-time Three.js cinematic introduction.

## Run locally

Requires Node.js 22.12+ (Node.js 24 LTS recommended).

```sh
npm ci
npm run dev
```

## Production

```sh
npm run build
npm run preview
```

Vite outputs the production site to `dist/`. On Vercel, select the **Vite** preset, install with `npm ci`, build with `npm run build`, and publish `dist` on the free Hobby plan.

## Experience

- Click once to begin the 30-second film, or use Skip Animation to reach the portfolio immediately.
- The film plays once, returns to the cover and reveals the Tech Stack and Selected Work sections.
- Home, Tech Stack and Project navigation, optional replay, project detail dialogs and Demo confirmation dialogs.
- No backend or environment variables are required. Images and logos are served from `public/`.
- WebGL hardware acceleration is needed for the 3D introduction. Playback pauses while the tab is hidden.

## Structure

- `src/App.jsx`: application and playback controls.
- `src/film.js`: camera timeline and 3D scenes.
- `src/components/cover/`: cover, personal introduction and playback buttons.
- `src/components/portfolio/`: navigation and Tech Stack.
- `src/components/projects/`: project cards and detail dialogs.
- `src/effects/`: visual effects.
- `public/images/`, `public/logos/`, `public/projects/`: site assets.

Profile README drafts, local QA screenshots and `node_modules/` are not part of this website deployment.
