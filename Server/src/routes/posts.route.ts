import { Router } from "express";

import {
  createPost,
  removePost,
  updatePost,
} from "../controllers/posts/post.controller.js";
import {
  comment,
  likeComment,
  deleteComment,
} from "../controllers/posts/commet.controller.js";

import protectedRoute from "../middlewares/protectedRoute.middelware.js";
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
post.post("/remove-post", protectedRoute, removePost);
export default post;
