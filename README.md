# PostHive

PostHive is a small, beginner-friendly posts demo app built with Express and EJS.  simple to run, easy to explain, and straightforward to extend.

## What this project demonstrates

- Basic Express routing and middleware
- Templating with EJS
- CRUD operations (Create, Read, Update, Delete) with server-side rendering
- Method override to support PATCH/DELETE via HTML forms


## Tech

- Node.js + Express
- EJS for templates
- UUID for post IDs

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start the app:

```bash
npm start
```

3. Open http://localhost:3000 in your browser.

(For development with auto-reload, install `nodemon` globally and run `npm run dev`).

## Project structure (key files)

- `main.js` — main Express application and routes
- `views/` — EJS templates: list, create form, edit form, detail view
- `public/style.css` — basic styles for demo
- `package.json` — scripts and dependencies


