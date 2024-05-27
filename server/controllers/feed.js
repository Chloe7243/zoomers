const Post = require("../models/post");
const User = require("../models/user");
const cloudinary = require("../utils/cloudinary");
const { validationResult } = require("express-validator");
const handleError = require("../utils/handleError");

// Get all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({
      success: true,
      message: "Fetched posts Successfully",
      data: posts,
    });
  } catch (err) {
    return handleError(res, err.message, err.statusCode);
  }
};

// Get post by id
exports.getPost = async (req, res) => {
  const postID = req.params.postId;
  try {
    if (!postID) {
      err.statusCode = 404;
      throw new Error("Couldnt't find post");
    }
    const post = await Post.findById(postID);
    res.status(200).json({
      success: true,
      message: "Fetched post Successfully",
      data: post,
    });
  } catch (err) {
    return handleError(res, err.message, err.statusCode);
  }
};

// Like a post
exports.likeAPost = async (req, res) => {
  const postID = req.params.postId;
  try {
    if (!postID) {
      err.statusCode = 404;
      throw new Error("Couldnt't find post");
    }
    const post = await Post.findById(postID);
    const user = await User.findById(req.userId);
    user.profile.likes.push(postID)
    post.likes.increase();
    await post.save();
    await user.save();
    res.status(200).json({
      success: true,
      message: "Fetched post Successfully",
      data: post,
    });
  } catch (err) {
    return handleError(res, err.message, err.statusCode);
  }
};

// Unlike a post
exports.UnlikeAPost = async (req, res) => {
  const postID = req.params.postId;
  try {
    if (!postID) {
      err.statusCode = 404;
      throw new Error("Couldnt't find post");
    }
    const post = await Post.findById(postID);
    const user = await User.findById(req.userId);
    user.profile.likes.pull(postID)
    post.likes.decrease();
    await post.save();
    await user.save();
    res.status(200).json({
      success: true,
      message: "Successful",
    });
  } catch (err) {
    return handleError(res, err.message, err.statusCode);
  }
};
