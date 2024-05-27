const mongoose = require("mongoose");
const Post = require("./post");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    profile: {
      posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
      likes: [{ type: Schema.Types.ObjectId, ref: "Post" }],
      following: [{ type: Schema.Types.ObjectId, ref: "User" }],
      followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
