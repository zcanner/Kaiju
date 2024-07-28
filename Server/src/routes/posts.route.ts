import { Router } from "express";

import {
  createPost,
  removePost,
  updatePost,
  togglePostLike,
} from "../controllers/posts/post.controller.js";
import {
  comment,
  likeComment,
  deleteComment,
} from "../controllers/posts/commet.controller.js";

import protectedRoute from "../middlewares/protectedRoute.middelware.js";
import getPosts from "../controllers/posts/getPosts.js";
const post = Router();
// create post
post.post("/create", protectedRoute, createPost);
// update post
post.post("/update", protectedRoute, updatePost);
// comment on post
post.post("/comment:postID", protectedRoute, comment);
// like comment
post.post("/post:postID/comment:commentID", protectedRoute, likeComment);
// delete comment
post.post("/comment", protectedRoute, deleteComment);
// remove post
post.delete("/delete/:postID", protectedRoute, removePost);
// like-unlike post
post.post("/toggleLike", protectedRoute, togglePostLike);
// get posts
post.get("/get-posts", protectedRoute, getPosts);
export default post;
