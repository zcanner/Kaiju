import { Router } from "express";

// handlers
import follow from "../controllers/user/follow.controller.js";
import {
  getUser,
  getUserPosts,
} from "../controllers/user/getUser.controller.js";
import blockUser from "../controllers/user/blockUser.controller.js";
import updateUser from "../controllers/user/updateUser.controller.js";

//middelware
import protectedRoute from "../middlewares/protectedRoute.middelware.js";
import protectUserMiddleware from "../middlewares/protectUser.middelware.js";

const user = Router();

user.post("/updateFollowStatus", protectedRoute, protectUserMiddleware, follow);

user.get("/", protectUserMiddleware, getUser);

user.get("/posts/:author", getUserPosts);

user.post("/block", protectedRoute, blockUser);

user.post("/update", protectedRoute, updateUser);

export default user;
