const express = require("express");
const controller = require("../controllers/user");
const { body, param } = require("express-validator");

const router = express.Router();

// GET user details
router.get("/user-details?:id", controller.getUser);

// POST New Post
router.post(
  "/add-new-post",
  [
    body("content").trim().notEmpty().withMessage("Content shouldn't be empty"),
    body("media"),
  ],
  controller.addNewPost
);

// PATCH Edit Post
router.patch(
  "/edit-post/:id",
  [
    body("content").trim().notEmpty().withMessage("Content shouldn't be empty"),
    body("media").isBase64().withMessage("media format must be base64 string"),
    param("id")
      .trim()
      .notEmpty()
      .withMessage("Id required!")
      .isString()
      .withMessage("Id must be a string!"),
  ],
  controller.editPost
);

// DELETE Post
router.delete(
  "/delete-post/:id",
  [
    param("id")
      .trim()
      .notEmpty()
      .withMessage("Id required!")
      .isString()
      .withMessage("Id must be a string!"),
  ],
  controller.deletePost
);

// POST Follow a User
router.post(
  "/follow/:id",
  [
    param("id")
      .trim()
      .notEmpty()
      .withMessage("Id required!")
      .isString()
      .withMessage("Id must be a string!"),
  ],
  controller.followAUser
);

// POST Unollow a User
router.post(
  "/unfollow/:id",
  [
    param("id")
      .trim()
      .notEmpty()
      .withMessage("Id required!")
      .isString()
      .withMessage("Id must be a string!"),
  ],
  controller.unfollowAUser
);

// GET Followers
router.get("/followers", controller.getFollowers);

// GET Likes
router.get("/likes", controller.getLikes);

// // GET Posts
// router.get("/likes", controller.getLikes);

module.exports = router;
