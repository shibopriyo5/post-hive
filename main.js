const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");


const PORT = process.env.PORT || 3000;


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(methodOverride("__method"));

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`PostHive server listening on http://localhost:${PORT}`);
    });
}

module.exports = app;const store = require('./lib/store');


store.seedIfEmpty([
    { id: uuidv4(), username: 'dev_alex', content: 'Welcome to PostHive — a tiny posts demo.', createdAt: new Date().toISOString(), likes: 0 },
    { id: uuidv4(), username: 'sam_dev', content: 'This project is a demo Server-Rendered Posts Application.', createdAt: new Date().toISOString(), likes: 0 },
    { id: uuidv4(), username: 'jamie', content: 'Try creating, editing and deleting posts.', createdAt: new Date().toISOString(), likes: 0 },
]);

function findPost(id) {
    return store.findById(id);
}

app.get("/posts/editform/:id", (req, res) => {
  const { id } = req.params;
  const post = findPost(id);
  if (!post) return res.status(404).send("Post not found");
  return res.render("editform", { post });
});




app.get('/posts', (req, res) => {
    const { q } = req.query;
    let posts = store.getAll();
    if (q && q.trim()) {
        const term = q.trim().toLowerCase();
        posts = posts.filter((p) => (p.username || '').toLowerCase().includes(term) || (p.content || '').toLowerCase().includes(term));
    }
    res.render('Vposts', { posts, q: q || '' });
});


app.get("/posts/new", (req, res) => {
    res.render("form");
});
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

app.get('/posts/:id', (req, res) => {
    const { id } = req.params;
    const post = findPost(id);
    if (!post) return res.status(404).send('Post not found');
    return res.render('spost', { post });
});


app.patch('/posts/edit/:id', (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    const post = findPost(id);
    if (!post) return res.status(404).send('Post not found');
    if (!content) return res.status(400).send('Content is required');
    store.update(id, { content });
    return res.redirect('/posts');
});


app.delete('/posts/delete/:id', (req, res) => {
    const { id } = req.params;
    const ok = store.remove(id);
    if (!ok) return res.status(404).send('Post not found');
    return res.redirect('/posts');
});


app.post('/posts/like/:id', (req, res) => {
    const { id } = req.params;
    const post = findPost(id);
    if (!post) return res.status(404).send('Post not found');
    const likes = (post.likes || 0) + 1;
    store.update(id, { likes });
    return res.redirect('/posts');
});


app.get("/", (req, res) => {
    res.redirect("/posts");
});

app.use((req, res) => {
    res.status(404).send("Page not found");
});







