import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    content: String,
    image: String,
    views: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Number,
      default: 0,
    },
    isReply: {
      type: Boolean,
      default: false,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    affiliatedPost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
