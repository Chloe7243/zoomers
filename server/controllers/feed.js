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

// Create new post
exports.addNewPost = async (req, res) => {
  const { content, media } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return handleError(
      res,
      errors.array().map((err) => err.msg),
      422
    );
  }
  const postData = { content, user: req.userId };
  if (media) {
    try {
      const data = await cloudinary.uploader.upload(media);
      postData.mediaURL = data.secure_url;
    } catch (error) {
      return handleError(res, "Couldn't upload post. Please try again!", 500);
    }
  }

  try {
    const post = new Post(postData);
    await post.save();
    const user = await User.findById(req.userId);
    user.profile.posts.push(post);
    await user.save();
    res
      .status(201)
      .json({ message: "Post created successfuly", success: true });
  } catch (err) {
    return handleError(res, err.message, err.statusCode);
  }
};

// delete post
exports.deletePost = async (req, res) => {
  const postID = req.params.postId;
  try {
    if (!postID) {
      err.statusCode = 404;
      throw new Error("Couldnt't find post");
    }
    const post = await Post.findById(postID);
    if (!post) {
      err.statusCode = 404;
      throw Error("Couldn't find post.");
    }
    if (post.user._id.toString() !== req.userId) {
      err.statusCode = 401;
      throw Error("Not authorized");
    }
    await Post.findByIdAndDelete(postID);
    const user = await User.findById(req.userId);
    user.profile.posts.pull(postID);
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    return handleError(res, err.message, 500);
  }
};
