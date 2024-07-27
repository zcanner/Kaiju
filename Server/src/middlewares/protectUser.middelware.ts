import { Request, Response, NextFunction } from "express";
import Jwt, { JwtPayload } from "jsonwebtoken";

import User from "../schemas/user.schema.js";

const protectUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isQuery = Object.keys(req.query).length > 0;
  try {
    const token = req.cookies.token;
    if (!token) return next();

    const requestedUser = isQuery
      ? req.query.user || req.query.u
      : (Jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload).id;

    const decoded = Jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    const requestingUserId = decoded.id;

    const requestedUserDoc = isQuery
      ? await User.findOne({
          username: requestedUser,
        }).select("-password -email -__v -updatedAt")
      : await User.findById(requestedUser).select(
          "-password -email -__v -updatedAt"
        );
    if (!requestedUserDoc) {
      return res.status(404).json({ message: "User not found" });
    }

    /* lets check if requested user has blocked requesting user */
    if (requestedUserDoc.blockedUsers.includes(requestingUserId)) {
      return res.status(403).json({ message: "You are blocked by this user" });
    }

    /* check if requested user has private account & if the 
    requesting user does not follow return the following */
    const { blockedUsers, ...userResponse } = requestedUserDoc.toObject();
    res.locals.user = userResponse;

    return requestedUserDoc.private &&
      !requestedUserDoc.followers.includes(requestingUserId)
      ? res.status(200).send(userResponse)
      : next(); // if everything is fine, move on
  } catch (error) {
    console.error("Error in protectUserMiddleware:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export default protectUserMiddleware;
