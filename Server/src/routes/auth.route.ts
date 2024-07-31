import { Router } from "express";

import login from "../controllers/auth/login.controller.js";
import logout from "../controllers/auth/logout.controller.js";
import signup from "../controllers/auth/signup.controller.js";
import Status from "../controllers/auth/status.controller.js";

import authRedirect from "../middlewares/authRedirect.middelware.js";
import protectedRoute from "../middlewares/protectedRoute.middelware.js";

const auth = Router();

auth.post("/signup", authRedirect, signup);
auth.post("/login", authRedirect, login);
auth.post("/logout", protectedRoute, logout);
auth.get("/status", Status);
export default auth;
