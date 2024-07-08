import { Router } from "express";

import createPost from "../controllers/posts/createPost.controller.js";
import {
  comment,
  likeComment,
  deleteComment,
} from "../controllers/posts/commet.controller.js";

import protectedRoute from "../middlewares/protectedRoute.middelware.js";

const post = Router();
// create post
post.post("/create", protectedRoute, createPost);
// comment on post
post.post("/comment:postID", protectedRoute, comment);
// like comment
post.post("/post:postID/comment:commentID", protectedRoute, likeComment);
// delete comment
post.post("/comment", protectedRoute, deleteComment);
export default post;
