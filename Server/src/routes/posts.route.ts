import { Router } from "express";

import createPost from "../controllers/posts/createPost.controller.js";

import protectedRoute from "../middlewares/protectedRoute.middelware.js";

const post = Router();

post.post("/create", protectedRoute, createPost);

export default post;
