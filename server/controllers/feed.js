const Post = require("../models/post");
const User = require("../models/user");
const { validationResult } = require("express-validator");
const handleError = require("../utils/handleError");

// Get all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("user").sort({ updatedAt: -1 });
    res.status(200).json({
      success: true,
      message: "Fetched posts successfully",
      data: posts,
    });
  } catch (err) {
    return handleError(res, err.message, err.statusCode);
  }
};

// Get post by id
exports.getPost = async (req, res) => {
  const postID = req.params.id;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return handleError(
      res,
      errors.array().map((err) => err.msg),
      422
    );
  }
  try {
    // if (!postID) {
    //   err.statusCode = 404;
    //   throw new Error("Couldnt't find post");
    // }
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

// Get post likes
exports.getPostLikes = async (req, res) => {
  const postID = req.params.id;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return handleError(
      res,
      errors.array().map((err) => err.msg),
      422
    );
  }
  try {
    const post = await Post.findById(postID).populate("likes");
    res.status(200).json({
      success: true,
      message: "Fetched post likes",
      data: post.likes,
    });
  } catch (err) {
    return handleError(res, err.message, err.statusCode);
  }
};

// Get post comments
exports.getPostComments = async (req, res) => {
  const postID = req.params.id;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return handleError(
      res,
      errors.array().map((err) => err.msg),
      422
    );
  }
  try {
    // if (!postID) {
    //   err.statusCode = 404;
    //   throw new Error("Couldnt't find post");
    // }
    const post = await Post.findById(postID).populate({
      path: "comments",
      populate: {
        path: "user",
      },
    });
    res.status(200).json({
      success: true,
      message: "Fetched post comments",
      data: post.comments,
    });
  } catch (err) {
    return handleError(res, err.message, err.statusCode);
  }
};

// Like a post
exports.likeAPost = async (req, res) => {
  const postID = req.params.id;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return handleError(
      res,
      errors.array().map((err) => err.msg),
      422
    );
  }
  try {
    // if (!postID) {
    //   err.statusCode = 404;
    //   throw new Error("Couldnt't find post");
    // }

    const post = await Post.findById(postID);
    const user = await User.findById(req.userId);
    user.profile.likes.push(post);
    post.likes.push(user);
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
exports.unlikeAPost = async (req, res) => {
  const postID = req.params.id;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return handleError(
      res,
      errors.array().map((err) => err.msg),
      422
    );
  }
  try {
    // if (!postID) {
    //   err.statusCode = 404;
    //   throw new Error("Couldnt't find post");
    // }
    const post = await Post.findById(postID);
    const user = await User.findById(req.userId);

    user.profile.likes.pull(post);
    post.likes.pull(user);
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
