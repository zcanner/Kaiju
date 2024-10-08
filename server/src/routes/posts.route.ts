import { Router } from "express";

import {
  createPost,
  removePost,
  updatePost,
  togglePostLike,
} from "../controllers/posts/post.controller.js";

import protectedRoute from "../middlewares/protectedRoute.middelware.js";
import { getPosts, getPost } from "../controllers/posts/getPosts.js";
import save from "../controllers/posts/save.controller.js";
import getSaved from "../controllers/posts/getSaved.js";

const post = Router();
// create post
post.post("/create", protectedRoute, createPost);
// update post
post.post("/update", protectedRoute, updatePost);
// remove post
post.delete("/delete/:postID", protectedRoute, removePost);
// like-unlike post
post.post("/toggleLike", protectedRoute, togglePostLike);
// get posts
post.get("/get-posts", protectedRoute, getPosts);
// get a single post
post.get("/get/:postID", protectedRoute, getPost);
// save post
post.post("/save", protectedRoute, save);
// get-saved posts
post.get("/get-saved/:userID", protectedRoute, getSaved);
export default post;
