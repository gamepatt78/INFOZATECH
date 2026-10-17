# Taskflow — Drag-and-Drop Kanban Board

A tidy, responsive board for turning a long to-do list into the next small, doable step.

**[Open the live demo](https://kanban-board-23fb7.web.app/)** · **[View the GitHub repository](https://github.com/gamepatt78/kanban-board)**

## Take a look

Move work across three simple columns:

```text
To do  →  In progress  →  Done
```

Drag a card to another column, or use the arrow buttons on the card if you prefer not to drag.

## What you can do

- **Organize work:** Add cards to any column, then edit or delete them as plans change.
- **Add context:** Give each task a description, a low/medium/high priority, and an optional label.
- **Track progress:** See task totals for the board and for each column.
- **Keep your changes:** The board saves automatically to browser storage and restores after refresh.
- **Use it on smaller screens:** The layout adapts to phones, tablets, and desktop.
- **Choose your interaction:** Drag and drop cards or use the built-in move controls.

## Storage and privacy

This is a front-end demo. Tasks are saved in local storage in the current browser on this device. There are no accounts, shared boards, server sync, or Firebase database. Clearing this browser’s site data removes its saved board.

## Built with

- React 19
- Vite
- Lucide icons
- Firebase Hosting

## Run locally

**Requirements:** Node.js 20 or newer and npm.

Open PowerShell in this project folder:

```powershell
npm.cmd ci
npm.cmd run dev
```

Vite prints the local development URL in the terminal, usually `http://localhost:5173`.

## Build and preview

Create the production site in `dist/`:

```powershell
npm.cmd run build
npm.cmd run preview
```

## Deploy to Firebase Hosting

This app uses a separate Firebase Hosting site, so deploying it does not replace the Product Search or Form Wizard apps. The Firebase project configuration is included.

```powershell
firebase.cmd login
npm.cmd run build
firebase.cmd deploy --only hosting --project product-search-app-929a5
```

Live URL: **[kanban-board-23fb7.web.app](https://kanban-board-23fb7.web.app/)**

## Project structure

```text
kanban-board/
├── src/
│   ├── App.jsx       # Board, task actions, drag-and-drop, and persistence
│   ├── index.css     # Responsive board and dialog styles
│   └── main.jsx      # React entry point
├── firebase.json     # Separate Hosting site configuration
├── index.html
├── package.json
└── README.md
```
