# PostHive

PostHive is a small, beginner-friendly posts demo app built with Express and EJS. It's designed for placements and internship demos: simple to run, easy to explain, and straightforward to extend.

## What this project demonstrates

- Basic Express routing and middleware
- Templating with EJS
- CRUD operations (Create, Read, Update, Delete) with server-side rendering
- Method override to support PATCH/DELETE via HTML forms
- Clean, well-commented code suitable for interviews

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

## Notes for interviews

- Explain the in-memory store and how you'd swap it for a DB (e.g., MongoDB) — show the single place to replace.
- Describe method-override and why HTML forms need it for PATCH/DELETE.
- Discuss validation and how to add more robust checks and error handling.
- Suggest authentication and authorization as next steps.

## Next steps / Improvements (optional)

- Add a persistence layer (MongoDB + Mongoose)
- Add authentication (Passport.js or JWT)
- Add unit tests for routes using a test runner (Mocha/Jest) and supertest
- Add a JSON API alongside the server-rendered pages
 - Add a JSON API alongside the server-rendered pages
 - Persistence: this version includes a tiny file-backed store at `data/posts.json` (see `lib/store.js`) so posts persist across restarts without a full database.

---

Good luck with interviews — keep the demo focused on clear, explainable code and the simple design choices made here.
