# Stepwise — Multi-Step Form Wizard

A clean, responsive form experience that guides people through a few details at a time, validates each step, and shows a review before completion.

**[Open the live demo](https://multi-step-form-wizard.web.app/)** · **[View the source on GitHub](https://github.com/gamepatt78/multi-step-form-wizard)**

## The flow

| Step | What happens |
| --- | --- |
| **01 · Personal info** | Enter a name, email address, and phone number. |
| **02 · Address** | Add a street address, city, region, postal code, and country. Apartment or suite is optional. |
| **03 · Review** | Check the information, jump back to edit a section, then submit to see the completion screen. |

## Features

- Progress indicator for current and completed steps
- Required-field validation, plus email, phone-number, and postal-code checks
- Helpful inline validation messages
- Back and edit navigation that keeps entered values
- Responsive layout for desktop and mobile screens
- Accessible form labels, keyboard focus, and step announcements
- No backend required

> **Privacy:** This is a front-end demo. Information stays in the current browser session; it is not sent to a server or saved. Submitting the form only displays a confirmation.

## Built with

- React 19
- Vite
- Lucide icons
- Firebase Hosting

## Run locally

**Requirements:** Node.js 20 or newer and npm.

Open PowerShell in this project folder and run:

```powershell
npm.cmd ci
npm.cmd run dev
```

Vite prints the local development URL in the terminal, usually `http://localhost:5173`.

## Production build

Build the static site into the `dist/` folder:

```powershell
npm.cmd run build
```

To preview the production build locally:

```powershell
npm.cmd run preview
```

## Deploy to Firebase Hosting

This app uses its own Firebase Hosting site, separate from the Product Search app. The project is already configured for the `multi-step-form-wizard` site in Firebase project `product-search-app-929a5`.

Sign in to Firebase if needed, then build and deploy:

```powershell
firebase.cmd login
npm.cmd run build
firebase.cmd deploy --only hosting --project product-search-app-929a5
```

Live URL: **[multi-step-form-wizard.web.app](https://multi-step-form-wizard.web.app/)**

## Project structure

```text
multi-step-form-wizard/
├── src/
│   ├── App.jsx       # Wizard steps, validation, review, and completion
│   ├── index.css     # Responsive styling
│   └── main.jsx      # React entry point
├── firebase.json     # Hosting configuration (build output: dist/)
├── index.html
├── package.json
└── README.md
```
