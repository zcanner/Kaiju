import { Router } from "express";

// handlers
import follow from "../controllers/user/follow.controller.js";
import unfollow from "../controllers/user/unfollow.controller.js";
import getUser from "../controllers/user/getUser.controller.js";
import blockUser from "../controllers/user/blockUser.controller.js";
//middelware
import protectedRoute from "../middlewares/protectedRoute.middelware.js";
import protectUserMiddleware from "../middlewares/protectUser.middelware.js";

const user = Router();

user.post("/follow", protectedRoute, protectUserMiddleware, follow);

user.post("/unfollow", protectedRoute, protectUserMiddleware, unfollow);

user.get("/:user", protectUserMiddleware, getUser);

user.post("/block", protectedRoute, blockUser);

export default user;
