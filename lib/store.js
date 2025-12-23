const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const DATA_FILE = path.join(DATA_DIR, 'posts.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function load() {
  ensureDataDir();
  if (!fs.existsSync(DATA_FILE)) {
    // initialize with an empty array
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), 'utf8');
  }
  const raw = fs.readFileSync(DATA_FILE, 'utf8');
  try {
    return JSON.parse(raw);
  } catch (e) {
    // if file corrupted, reset
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), 'utf8');
    return [];
  }
}

function save(posts) {
  ensureDataDir();
  fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2), 'utf8');
}

// Simple in-memory cache to avoid reading file for every small operation.
let posts = load();

function getAll() {
  return posts.slice(); // return a copy
}

function findById(id) {
  return posts.find((p) => p.id === id);
}

function add(post) {
  posts.push(post);
  save(posts);
  return post;
}

function update(id, patch) {
  const p = findById(id);
  if (!p) return null;
  Object.assign(p, patch);
  save(posts);
  return p;
}

function remove(id) {
  const before = posts.length;
  posts = posts.filter((p) => p.id !== id);
  if (posts.length !== before) {
    save(posts);
    return true;
  }
  return false;
}

function seedIfEmpty(defaultPosts) {
  if (!posts || posts.length === 0) {
    posts = defaultPosts || [];
    save(posts);
  }
}

module.exports = { getAll, findById, add, update, remove, seedIfEmpty };
