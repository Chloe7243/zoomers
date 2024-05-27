const Post = require("../models/post");
const User = require("../models/user");
const cloudinary = require("../utils/cloudinary");
const { validationResult } = require("express-validator");
const handleError = require("../utils/handleError");

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
      const data = await cloudinary.uploader.upload(media, {
        folder: "zoomers",
      });
      postData.media = { url: data.secure_url, id: data.public_id };
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

// Edit existing post
exports.editPost = async (req, res) => {
  const postID = req.params.Id;
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
        const data = await cloudinary.uploader.upload(media, {
          folder: "zoomers",
        });
        postData.media = { url: data.secure_url, id: data.public_id };
        await cloudinary.api.delete_resources([post.media.id]);
      } catch (error) {
        return handleError(res, "Couldn't upload post. Please try again!", 500);
      }
    }
    await Post.findByIdAndUpdate(postID, postData);
    await post.save();
    return res
      .status(200)
      .json({ success: true, message: "Updated successfully" });
  } catch (err) {
    return handleError(res, err.message, 500);
  }
};

// delete post
exports.deletePost = async (req, res) => {
  const postID = req.params.Id;
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
    await cloudinary.api.delete_resources([post.media.id]);
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

// Get user posts
exports.getPosts = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate("profile.posts");
    res.status(200).json({
      success: true,
      message: "Successful",
      data: user,
    });
  } catch (err) {
    return handleError(res, err.message, err.statusCode);
  }
};

// Get user followers
exports.getFollowers = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate("profile.followers");
    res.status(200).json({
      success: true,
      message: "Successful",
      data: user,
    });
  } catch (err) {
    return handleError(res, err.message, err.statusCode);
  }
};

// Get user likes
exports.getLikes = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate("profile.likes");
    res.status(200).json({
      success: true,
      message: "Successful",
      data: user,
    });
  } catch (err) {
    return handleError(res, err.message, err.statusCode);
  }
};

// Follow a user
exports.followAUser = async (req, res) => {
  const userToFollowId = req.params.Id;
  try {
    const userFollowing = await User.findById(req.userId);
    const userToFollow = await User.findById(userToFollowId);
    userToFollow.profile.followers.push(req.userId);
    userFollowing.profile.following.push(userToFollowId);
    await userToFollow.save();
    await userFollowing.save();
    res.status(200).json({
      success: true,
      message: "Successful",
    });
  } catch (err) {
    return handleError(res, err.message, err.statusCode);
  }
};

// Get user likes
exports.unfollowAUser = async (req, res) => {
  const userToUnfollowId = req.params.Id;
  try {
    const userUnfollowing = await User.findById(req.userId);
    const userToUnfollow = await User.findById(userToUnfollowId);
    userToUnfollow.profile.followers.pull(req.userId);
    userUnfollowing.profile.following.push(userToUnfollowId);
    await userToUnfollow.save();
    await userUnfollowing.save();
    res.status(200).json({
      success: true,
      message: "Successful",
    });
  } catch (err) {
    return handleError(res, err.message, err.statusCode);
  }
};

// Get user likes
exports.updateUserProfile = async (req, res) => {
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
