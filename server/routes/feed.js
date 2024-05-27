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

// POST Like a post
router.get(
  "/like-post/:id",
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

// POST Unlike a post
router.get(
  "/unlike-post/:id",
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

module.exports = router;
