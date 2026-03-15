const express = require("express");
const app = express();

app.use(express.json());

let posts = [];

// Home route
app.get("/", (req, res) => {
  res.send("Blog API Running Successfully");
});

// Get all posts
app.get("/posts", (req, res) => {
  res.json(posts);
});

// Create post
app.post("/posts", (req, res) => {
  const { title, content } = req.body;

  const newPost = {
    id: posts.length + 1,
    title,
    content
  };

  posts.push(newPost);
  res.json(newPost);
});

// Update post
app.put("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find(p => p.id === id);

  if (!post) {
    return res.send("Post not found");
  }

  post.title = req.body.title;
  post.content = req.body.content;

  res.json(post);
});

// Delete post
app.delete("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);

  posts = posts.filter(p => p.id !== id);

  res.send("Post deleted");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});