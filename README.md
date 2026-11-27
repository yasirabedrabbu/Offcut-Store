# Offcut Hero

A dark, minimal streetwear shop hero built with Next.js. Ten garments hang edge-on in real CSS 3D on a chrome rail. Hover one and it swings round to face you. Click it and it lifts into a large detail view.

## Features

- Fixed 1500 x 1000 artboard that scales to fit any window
- Ten garments in CSS 3D (`rotateY` with `perspective: 900px`)
- Hover opens a gap in the rail and shows a caption
- Detail view with prev/next, counter, name and price
- Keyboard support: arrow keys, Enter, Escape
- Red scrolling marquee band
- Garments cut from a single sprite sheet with per-garment clip paths

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build

```bash
npm run build
npm start
```

## Controls

| Key | Rail | Detail view |
|---|---|---|
| Right arrow | Face next garment | Next |
| Left arrow | Face previous garment | Previous |
| Enter | Open faced garment | Nothing |
| Escape | Nothing | Close |

## Project structure

```
app/
  layout.js      fonts, metadata
  page.js        all logic and markup
  globals.css    all styles
lib/
  data.js        products, clip polygons, sprite constants
```

## Sprite sheet

The garments come from one transparent sprite sheet (2048 x 1360, 5 columns x 2 rows), set as `SHEET` in `lib/data.js`.

To use it offline:

1. Download the sheet from the URL in `lib/data.js`.
2. Save it as `public/sheet.webp`.
3. Set `SHEET = "/sheet.webp"` in `lib/data.js`.

## Tech

- Next.js (App Router)
- React
- Plain CSS
- Web Animations API

## Fonts

Inter, Instrument Serif (italic) and UnifrakturMaguntia, loaded from Google Fonts.

## License

MIT