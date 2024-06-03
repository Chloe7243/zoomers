const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
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
      image: {
        url: {
          type: String,
          default:
            "https://res-console.cloudinary.com/dnelvndzy/media_explorer_thumbnails/b53ecf06ae59d287d93a77be4fb5c12e/detailed",
        },
        id: String,
      },
      posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
      likes: [{ type: Schema.Types.ObjectId, ref: "Post" }],
      following: [{ type: Schema.Types.ObjectId, ref: "User" }],
      followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
      comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
