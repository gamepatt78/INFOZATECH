# Afterglow — Stories After Hours

A streaming-style discovery experience for a library of **22 original fictional stories**. Browse atmospheric story cards, filter by genre, search titles, save favorites, open story details, and read an original opening-scene preview.

**[Open the live demo](https://afterglow-streaming.web.app/)** · **[View the source on GitHub](https://github.com/gamepatt78/afterglow)**

## Explore

- **Discover:** Browse 22 original fictional films and series in horizontal, scrollable genre carousels.
- **Filter:** Narrow the library by Adventure, Comedy, Drama, Mystery, or Sci-Fi.
- **Search:** Find a title or explore story descriptions.
- **Explore a story:** Open its details and read an original opening-scene preview.
- **My List:** Save and remove titles; the list persists in the current browser.
- **Go anywhere:** Responsive layout, smooth carousel scrolling, and a mobile navigation menu.

Every title, synopsis, opening scene, and poster-style illustration is original demo content. Artwork is created with CSS; the experience does not use real movie or music artwork, catalog data, or a streaming service’s branding.

## Built with

- React 19
- Vite
- Lucide icons
- CSS-generated poster artwork
- Firebase Hosting

## Run locally

**Requirements:** Node.js 20 or newer and npm.

From this project folder, run:

```powershell
npm.cmd ci
npm.cmd run dev
```

Vite prints the local URL in the terminal, usually `http://localhost:5173`.

## Build and preview

Create the production site in `dist/` and preview it locally:

```powershell
npm.cmd run build
npm.cmd run preview
```

## Deploy to Firebase Hosting

The streaming demo uses its own Firebase Hosting site, separate from the Product Search, Form Wizard, and Kanban apps.

```powershell
firebase.cmd login
npm.cmd run build
firebase.cmd deploy --only hosting --project product-search-app-929a5
```

Live demo: **[afterglow-streaming.web.app](https://afterglow-streaming.web.app/)**
