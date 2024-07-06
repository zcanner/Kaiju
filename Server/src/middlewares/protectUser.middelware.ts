import { Request, Response, NextFunction } from "express";
import Jwt, { JwtPayload } from "jsonwebtoken";

import User from "../schemas/user.schema.js";

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
    const requestedUserDoc = await User.findOne({
      // TODO : add -posts people who are not following the user can't see the posts
      username: requestedUser,
    }).select("-password -email -blockedUsers -__v -updatedAt");
    if (!requestedUserDoc) {
      return res.status(404).json({ message: "User not found" });
    }

    if (requestedUserDoc._id.toString() === requestingUserId) {
      return next();
    }

    /* lets check if requested user has blocked requesting user */

    if (requestedUserDoc.blockedUsers.includes(requestingUserId)) {
      return res.status(403).json({ message: "You are blocked by this user" });
    }

    /* check if requested user has private account 
       & if the requesting user does not follow return the following */

    return requestedUserDoc.private &&
      !requestedUserDoc.followers.includes(requestingUserId)
      ? res.status(200).send(requestedUserDoc)
      : next(); // if everything is fine, move on
  } catch (error) {
    console.error("Error in protectUserMiddleware:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export default protectUserMiddleware;
