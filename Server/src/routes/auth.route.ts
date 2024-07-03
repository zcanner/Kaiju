import { Router } from "express";
import signup from "../controllers/auth/signup.controller";
import login from "../controllers/auth/login.controller";

const route = Router();

route.post("/signup", signup);

route.post("/login", login);

export default route;
