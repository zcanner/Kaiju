import { Router } from "express";

import getBlockedUsers from "../controllers/settings/getBlockedUsers.controller.js";
import updateEmail from "../controllers/settings/updateEmail.controller.js";
import updatePassword from "../controllers/settings/updatePassword.controller.js";
import togglePrivatePublic from "../controllers/settings/tooglePrivate.controller.js";

//middelware
import protectedRoute from "../middlewares/protectedRoute.middelware.js";

const setting = Router();

setting.get("/blockedUsers", protectedRoute, getBlockedUsers);
setting.post("/updateEmail", protectedRoute, updateEmail);
setting.post("/updatePassword", protectedRoute, updatePassword);
setting.post("/togglePrivatePublic", protectedRoute, togglePrivatePublic);

export default setting;
