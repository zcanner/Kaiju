import { Router } from "express";

import auth from "./auth.route.js";
import user from "./user.route.js";
import post from "./posts.route.js";
import setting from "./settings.route.js";

const route = Router();

// auth routes
route.use("/auth", auth);
// user routes
route.use("/user", user);
// post routes
route.use("/fun", post);
// settings routes
route.use("/setting", setting);

export default route;
