const express = require("express");
const { param } = require("express-validator");
const controller = require("../controllers/feed");

const router = express.Router();

// GET Posts
router.get("/get-posts", controller.getPosts);

// GET Post by ID
router.get(
  "/get-post/:id",
  [
    param("id")
      .trim()
      .notEmpty()
      .withMessage("Id required!")
      .isString()
      .withMessage("Id must be a string!"),
  ],
  controller.getPost
);

// GET Post likes
router.get(
  "/get-post-likes/:id",
  [
    param("id")
      .trim()
      .notEmpty()
      .withMessage("Id required!")
      .isString()
      .withMessage("Id must be a string!"),
  ],
  controller.getPostLikes
);

// GET Post comments
router.get(
  "/get-post-comments/:id",
  [
    param("id")
      .trim()
      .notEmpty()
      .withMessage("Id required!")
      .isString()
      .withMessage("Id must be a string!"),
  ],
  controller.getPostComments
);

// POST Like a post
router.patch(
  "/like-post/:id",
  [
    param("id")
      .trim()
      .notEmpty()
      .withMessage("Id required!")
      .isString()
      .withMessage("Id must be a string!"),
  ],
  controller.likeAPost
);

// POST Unlike a post
router.patch(
  "/unlike-post/:id",
  [
    param("id")
      .trim()
      .notEmpty()
      .withMessage("Id required!")
      .isString()
      .withMessage("Id must be a string!"),
  ],
  controller.unlikeAPost
);

module.exports = router;
