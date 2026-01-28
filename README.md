# PostHive

PostHive is a straightforward, full-stack demo application designed to help developers learn and showcase key concepts in server-rendered web development. The project demonstrates essential skills including RESTful routing, stateful data handling, dynamic templating with EJS, and common Express.js middleware patterns.

---

## Features

- **CRUD Operations**: Create, read, update, and delete posts with form-based server-rendered pages.
- **Dynamic Templating**: Uses [EJS](https://ejs.co/) for server-side rendering of UI, supporting clean separation of concerns.
- **Express Routing & Middleware**: Demonstrates practical use of Express.js for route handling, static files, and HTTP method overrides.
- **Persistent Local Storage**: Persists posts as JSON on the filesystem, illustrating a typical prototype data flow.
- **Post “Like” Feature**: Implements a simple like counter for each post, updated via standard POST requests.
- **Search Functionality**: Users can filter posts by username or content from the UI.

---

## Technology Stack

- **Backend**: [Node.js](https://nodejs.org/), [Express 5](https://expressjs.com/), [method-override](https://www.npmjs.com/package/method-override)
- **Templating**: [EJS](https://ejs.co/)
- **Data Storage**: Local file-based JSON (no external database required)
- **Tooling**: [nodemon](https://nodemon.io/) (development), [ESLint](https://eslint.org/), [Prettier](https://prettier.io/), [Jest](https://jestjs.io/) (testing), [supertest](https://github.com/ladjs/supertest)

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) 
- [npm](https://www.npmjs.com/)

### Installation

Clone the repository and install dependencies:
```bash
git clone https://github.com/shibopriyo5/post-hive.git
cd post-hive
npm install
```

### Running the Application

Start the server:
```bash
npm start
```
Or start in development mode (with auto-restart on file changes):
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your web browser.

---

## Project Structure

```
post-hive/
├── data/              # JSON data storage for posts
├── lib/               # Core logic and data helpers
├── public/            # Static assets (CSS)
├── views/             # EJS templates for all views
├── tests/             # Jest & Supertest integration tests
├── main.js            # Main Express application
├── package.json       # Project metadata & scripts
└── README.md          # Project documentation
```

---

## Usage

- **Browse Posts**: Visit `/posts` to view all posts. Use the search box for quick filtering.
- **Create Post**: Click “Create New Post” and submit the form.
- **View Post**: Click “View” to see full post details including likes.
- **Edit Post**: Click “Edit”, update content, and submit.
- **Delete Post**: Use the “Delete” button on a post.
- **Like Post**: Use the “Like” button on the post detail or list to increment likes count.

All data is locally stored in `data/posts.json`. No user authentication is implemented—this is for demonstration and learning purposes.

---

## Testing

Run automated tests with:
```bash
npm test
```
This project includes a sample Jest/Supertest test for the main route.

---

## Contributing

Contributions are welcome! Please submit issues or pull requests via GitHub. For major changes, open a discussion before starting work.

---

## License

## License

MIT License

Copyright (c) 2026

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


---

## Contact

Created and maintained by [shibopriyo5](https://github.com/shibopriyo5).
Questions, feedback, and collaboration proposals are always welcome via GitHub Issues or Discussions.
