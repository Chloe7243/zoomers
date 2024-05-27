const express = require("express");
const User = require("../models/user");
const { body } = require("express-validator");
const controller = require("../controllers/user");

const router = express.Router();

// POST Login user
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email."),
    body(
      "password",
      "Password must consist of letters and numbers and must be a minimum of 8 characters"
    )
      .isLength({ min: 8 })
      .isAlphanumeric(),
  ],
  controller.postLogin
);

// POST Signup user
router.post(
  "/signup",
  [
    body("username")
      .notEmpty()
      .withMessage("Username must not be empty")
      .custom(async (value) => {
        const data = await User.findOne({ username: value });
        if (data) return Promise.reject("Username already taken!");
      }),
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom(async (email) => {
        const data = await User.findOne({ email });
        if (data) return Promise.reject("E-mail Address already exists!");
      })
      .normalizeEmail(),
    body("password")
      .isLength({ min: 8 })
      .isAlphanumeric()
      .withMessage(
        "Password must consist of letters and numbers and must be a minimum of 8 characters"
      ),
    body("dob", "Username must not be empty")
      .isISO8601()
      .withMessage("dob must be a valid date!"),
  ],
  controller.postSignUp
);

// // POST Signup user
// router.post("/get-user-followers", controller.postSignUp)

module.exports = router;
