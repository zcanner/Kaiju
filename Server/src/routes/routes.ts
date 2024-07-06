import { Router } from "express";

import auth from "./auth.route.js";
import user from "./user.route.js";

const route = Router();

// auth routes
route.use("/auth", auth);
// user routes
route.use("/user", user);

export default route;
