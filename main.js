const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

// Config
const PORT = process.env.PORT || 3000;

// View engine and static files
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Parse request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Support method override for HTML forms (use ?__method=PATCH or DELETE)
app.use(methodOverride("__method"));

// Start server (after middleware and routes configured)
// Only start the server when this file is run directly.
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`PostHive server listening on http://localhost:${PORT}`);
    });
}

// Export app for testing or external usage (e.g. serverless)
module.exports = app;
// Data store (file-backed) for a small persistent demo without an external DB
const store = require('./lib/store');

// Seed with a few sample posts on first run if store is empty
store.seedIfEmpty([
    { id: uuidv4(), username: 'dev_alex', content: 'Welcome to PostHive — a tiny posts demo.', createdAt: new Date().toISOString(), likes: 0 },
    { id: uuidv4(), username: 'sam_dev', content: 'This project is Server-Rendered Posts Application
.', createdAt: new Date().toISOString(), likes: 0 },
    { id: uuidv4(), username: 'jamie', content: 'Try creating, editing and deleting posts.', createdAt: new Date().toISOString(), likes: 0 },
]);

function findPost(id) {
    return store.findById(id);
}
// Render edit form for a post
app.get("/posts/editform/:id", (req, res) => {
  const { id } = req.params;
  const post = findPost(id);
  if (!post) return res.status(404).send("Post not found");
  return res.render("editform", { post });
});



// List all posts
// List all posts with optional search (q=)
app.get('/posts', (req, res) => {
    const { q } = req.query;
    let posts = store.getAll();
    if (q && q.trim()) {
        const term = q.trim().toLowerCase();
        posts = posts.filter((p) => (p.username || '').toLowerCase().includes(term) || (p.content || '').toLowerCase().includes(term));
    }
    res.render('Vposts', { posts, q: q || '' });
});

// Create post form
app.get("/posts/new", (req, res) => {
    res.render("form");
});

// Create post action
app.post('/posts/create', (req, res) => {
    const { username, content } = req.body;
    if (!username || !content) {
        return res.status(400).send('Username and content are required.');
    }
    const id = uuidv4();
    const newPost = { id, username, content, createdAt: new Date().toISOString(), likes: 0 };
    store.add(newPost);
    return res.redirect('/posts');
});
// View single post
app.get('/posts/:id', (req, res) => {
    const { id } = req.params;
    const post = findPost(id);
    if (!post) return res.status(404).send('Post not found');
    return res.render('spost', { post });
});

// Update post content
app.patch('/posts/edit/:id', (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    const post = findPost(id);
    if (!post) return res.status(404).send('Post not found');
    if (!content) return res.status(400).send('Content is required');
    store.update(id, { content });
    return res.redirect('/posts');
});

// Delete a post
app.delete('/posts/delete/:id', (req, res) => {
    const { id } = req.params;
    const ok = store.remove(id);
    if (!ok) return res.status(404).send('Post not found');
    return res.redirect('/posts');
});

// Like a post (simple POST action via form)
app.post('/posts/like/:id', (req, res) => {
    const { id } = req.params;
    const post = findPost(id);
    if (!post) return res.status(404).send('Post not found');
    const likes = (post.likes || 0) + 1;
    store.update(id, { likes });
    return res.redirect('/posts');
});

// Root -> redirect to posts list
app.get("/", (req, res) => {
    res.redirect("/posts");
});

// Basic 404 handler (for non-API requests)
app.use((req, res) => {
    res.status(404).send("Page not found");
});







