const express = require("express");
const { body, param } = require("express-validator");
const controller = require("../controllers/feed");

const router = express.Router();

// GET Posts
router.get("/get-posts", controller.getPosts);

// GET Post by ID
router.get("/get-post/:id", controller.getPost);

// POST New Post
router.post(
  "/add-new-post",
  [body("content").trim().notEmpty().withMessage("Content shouldn't be empty")],
  controller.addNewPost
);

// DELETE Post
router.delete(
  "/delete-post/:postId",
  [param("postId").trim().notEmpty().withMessage("PostId required!")],
  controller.deletePost
);

module.exports = router;
