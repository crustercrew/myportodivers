# assets

Static, imported-at-build-time files live here: local images, fonts, and
other binary assets you `import` directly in components (Vite turns those
imports into hashed, optimized URLs).

This project currently sources its imagery from remote URLs (see
`src/data/projects.ts`) and its fonts from Google Fonts `<link>` tags in
`index.html`, so this folder is empty for now. Drop files here — e.g.
`assets/images/aegis.jpg` — and update the relevant `data/*.ts` file to
`import aegis from '../assets/images/aegis.jpg'` when you want to self-host
them instead.
