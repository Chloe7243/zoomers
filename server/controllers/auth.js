const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const User = require("../models/user");
const handleError = require("../utils/handleError");
const { validationResult } = require("express-validator");

exports.postLogin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return handleError(
      res,
      errors.array().map((err) => err.msg),
      422
    );
  }
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const passwordMatch = bcrypt.compareSync(password, user.password);
      if (passwordMatch) {
        const userData = {
          email: user.email,
          userId: user._id.toString(),
          dob: user.dob,
        };
        const token = JWT.sign(userData, process.env.JWT_SECRET, {
          expiresIn: "2 days",
        });
        return res.status(200).json({
          message: "Login successful!",
          success: true,
          data: {
            authToken: token,
            ...userData,
          },
        });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Incorrect password." });
      }
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Email not found." });
    }
  } catch (error) {
    return handleError(res, err.message, err.statusCode || 500);
  }
};

exports.postSignUp = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return handleError(
      res,
      errors.array().map((err) => err.msg),
      422
    );
  }
  const { lastname, firstname, username, email, password, dob } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400);
    }
    const newUser = new User({
      lastname,
      firstname,
      username,
      email,
      dob,
      password: bcrypt.hashSync(password, 12),
      profile: {
        followers: [],
        following: [],
        likes: [],
        posts: [],
      },
    });
    const data = await newUser.save();
    return res.status(201).json({
      success: true,
      message: "Signed up successfully",
      data: {
        email: data.email,
        userId: data._id.toString(),
        dob: data.dob,
      },
    });
  } catch (error) {
    return handleError(res, err.message, err.statusCode);
  }
};
