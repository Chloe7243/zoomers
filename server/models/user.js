const mongoose = require("mongoose");
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
      image: { url: { type: String, default: "" }, id: String },
      posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
      likes: [{ type: Schema.Types.ObjectId, ref: "Post" }],
      following: [{ type: Schema.Types.ObjectId, ref: "User" }],
      followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
