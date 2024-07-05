import { Request, Response, NextFunction } from "express";
import Jwt, { JwtPayload } from "jsonwebtoken";

import User from "../schemas/user.schema";
const protectUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const requestedUser = req.params.user || req.query.u;
    const token = req.cookies.token;
    res.locals.user = res.locals.user; // idk what iam doing here

    if (!token) return next();

    const decoded = Jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    const requestingUserId = decoded.id;

    const requestedUserDoc = await User.findOne({ username: requestedUser });
    if (!requestedUserDoc) {
      return res.status(404).json({ message: "User not found" });
    }

    if (requestedUserDoc._id.toString() === requestingUserId) {
      return next();
    }

    if (requestedUserDoc.blockedUsers.includes(requestingUserId)) {
      return res.status(403).json({ message: "You are blocked by this user" });
    }

    next();
  } catch (error) {
    console.error("Error in protectUserMiddleware:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export default protectUserMiddleware;
