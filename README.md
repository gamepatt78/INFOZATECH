<div align="center">

# INFOZATECH

### A collection of web application projects

Independent, responsive demos built with React and Vite, with selected projects deployed on Firebase Hosting. The apps and their setup guides are included in this repository under their own folders.

[Product Search](https://product-search-app-929a5.web.app/) ·
[Form Wizard](https://multi-step-form-wizard.web.app/) ·
[Kanban Board](https://kanban-board-23fb7.web.app/) ·
[Afterglow](https://afterglow-streaming.web.app/) ·
[Northstar Analytics](https://infozatech-analytics.web.app/)

</div>

---

## Projects

Each app is self-contained in its own folder and can be explored, built, and deployed independently.

| Project | What it does | Live demo | Files in this repository | Standalone source |
| --- | --- | --- | --- | --- |
| **Product Search** · Task 2 | Search, filter, sort, and inspect products from a public catalog. Vehicle and motorcycle categories are excluded. | [Open app](https://product-search-app-929a5.web.app/) | [README and source](./product-search-app/) | [GitHub](https://github.com/gamepatt78/product-search-app) |
| **Multi-Step Form Wizard** · Task 3 | Complete validated personal and address steps, review entries, and see a submission confirmation. | [Open app](https://multi-step-form-wizard.web.app/) | [README and source](./multi-step-form-wizard/) | [GitHub](https://github.com/gamepatt78/multi-step-form-wizard) |
| **Kanban Board** · Task 4 | Organize work across To Do, In Progress, and Done with editable, draggable cards and browser persistence. | [Open app](https://kanban-board-23fb7.web.app/) | [README and source](./kanban-board/) | [GitHub](https://github.com/gamepatt78/kanban-board) |
| **Afterglow** · Task 5 | Browse 22 original fictional stories, open details, read opening-scene previews, and save favorites. | [Open app](https://afterglow-streaming.web.app/) | [README and source](./afterglow-streaming/) | [GitHub](https://github.com/gamepatt78/afterglow) |
| **Northstar Store Analytics** | Explore an interactive retail analytics dashboard with sample data, charts, filters, and Firebase Authentication. | [Open app](https://infozatech-analytics.web.app/) | [README and source](./infozatech-analytics/) | [GitHub](https://github.com/gamepatt78/northstar-store-analytics) |

## About this collection

This repository brings the task projects together while keeping each app self-contained in its own folder. Each app has its own README, dependency manifest, and Firebase Hosting configuration. The apps do not share a backend unless their documentation says otherwise. Standalone repositories are also maintained for the individual apps.

## Tech

The projects use a combination of:

- React and Vite
- Responsive CSS and Lucide icons
- Firebase Hosting
- Browser storage for selected demo preferences and board state
- Firebase Authentication in Northstar Store Analytics

## Run a project

Open an app folder from the table above and follow its README for requirements, local development, production builds, and deployment. Install dependencies and run commands from inside that app's folder. Each app has its own dependencies and Firebase Hosting configuration.

## Notes

- Product Search and Northstar display illustrative public or sample data; see each project's README for data details.
- The Form Wizard is a front-end demonstration and does not send submitted details to a backend.
- The Kanban Board saves board state in the current browser.
- Afterglow uses original fictional stories and CSS-generated poster illustrations.
