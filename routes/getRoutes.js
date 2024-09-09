const express = require("express");
const path = require("path");
const router = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    const query = "SELECT * FROM posts";

    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching posts:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      const postsWithImageURLs = results.map((post) => ({
        ...post,
        image: post.image ? path.basename(post.image) : null,
      }));

      res.status(200).json(postsWithImageURLs);
    });
  });

  router.get("/author/:author", (req, res) => {
    const author = req.params.author;
    const query = "SELECT * FROM posts WHERE author = ?";

    db.query(query, [author], (err, results) => {
      if (err) {
        console.error("Error fetching posts by author:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      const postsWithImageURLs = results.map((post) => ({
        ...post,
        image: post.image ? path.basename(post.image) : null,
      }));

      res.status(200).json(postsWithImageURLs);
    });
  });

  router.get("/post/:id", (req, res) => {
    const postId = req.params.id;
    const query = "SELECT * FROM posts WHERE id = ?";

    db.query(query, [postId], (err, results) => {
      if (err) {
        console.error("Error fetching post by ID:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: "Post not found" });
      }

      const postWithImageURL = {
        ...results[0],
        image: results[0].image ? path.basename(results[0].image) : null, 
      };

      res.status(200).json(postWithImageURL);
    });
  });

  return router;
};
