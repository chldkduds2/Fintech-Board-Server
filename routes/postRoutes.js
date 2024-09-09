const express = require("express");
const router = express.Router();
const path = require("path");

module.exports = (db) => {
  router.post("/", (req, res) => {
    const { title, author, date, content, hashtags, rating } = req.body;
    const image = req.file ? req.file.path : null;

    const hashtagsArray = hashtags.split(",");

    const query = `
      INSERT INTO posts (title, author, date, content, hashtags, rating, image)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      query,
      [
        title,
        author,
        date,
        content,
        JSON.stringify(hashtagsArray),
        rating,
        image,
      ],
      (err, results) => {
        if (err) {
          console.error("Error creating post:", err);
          return res.status(500).json({ error: "Internal server error" });
        }
        res.status(201).json({ message: "Post created successfully" });
      }
    );
  });

  router.put("/:id", (req, res) => {
    const postId = req.params.id;
    const { title, content, hashtags, rating } = req.body;
    const image = req.file ? req.file.path : null; // 새로운 이미지가 있으면 경로 설정
    const hashtagsArray = hashtags.split(",");

    // 기존 이미지가 있으면 수정하지 않고 유지
    const query = image
      ? `UPDATE posts SET title = ?, content = ?, hashtags = ?, rating = ?, image = ? WHERE id = ?`
      : `UPDATE posts SET title = ?, content = ?, hashtags = ?, rating = ? WHERE id = ?`;

    const queryParams = image
      ? [title, content, JSON.stringify(hashtagsArray), rating, image, postId]
      : [title, content, JSON.stringify(hashtagsArray), rating, postId];

    db.query(query, queryParams, (err, results) => {
      if (err) {
        console.error("Error updating post:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      res.status(200).json({ message: "Post updated successfully" });
    });
  });

  router.delete("/:id", (req, res) => {
    const postId = req.params.id;
    const query = "DELETE FROM posts WHERE id = ?";

    db.query(query, [postId], (err, results) => {
      if (err) {
        console.error("Error deleting post:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      res.status(200).json({ message: "Post deleted successfully" });
    });
  });

  return router;
};
