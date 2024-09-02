import { Request, Response, NextFunction } from "express";
import Jwt, { JwtPayload } from "jsonwebtoken";

import User from "../schemas/user.schema.js";

/**
 * This middleware is used to protect user's data from unauthorized access
 * like private account, blocked users etc.
 * @returns {any}
 */
const protectUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
	try {
		const requestType = req.query.requesttype;
		if (!requestType) return res.status(404).json("Please provide requestType in query"); 
		
		const isQuery = Object.keys(req.query).length > 0 && (req.query.u || req.query.user);
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
		const isBlocked = requestedUserDoc.blockedUsers.includes(requestingUserId);
    if (isBlocked) {
      return res.status(403).json({ message: "You are blocked by this user" });
    }

		/* check if user is blocked or private if true donot send posts */
		if (requestedUserDoc.private && !requestedUserDoc.followers.includes(requestingUserId) && requestType === "posts") {
			return res.status(200).json({ message: "User is private" });
		}

		/* check if requested user has private account if true next */
		if (requestedUserDoc.private && requestType === "follow-unfollow") {
			/* 
			* TODO add send and accept follow request, right now all this does is 
			* checks if the user is private and if request type is follow-unfollow
			* and returns to the next middleware. (basically it does nothing)
			*/
			return next();
		}

    /* check if requested user has private account & if the 
    requesting user does not follow return the following */
    const { blockedUsers, ...userResponse } = requestedUserDoc.toObject();
    res.locals.user = userResponse;

		if (requestedUserDoc._id.toString() === requestingUserId) return next()
		
		if (requestedUserDoc.private &&!requestedUserDoc.followers.includes(requestingUserId) && requestType === "user") {
			return res.status(200).json({userDoc: {
				username: requestedUserDoc.username,
				profileimg: requestedUserDoc.profileimg,
				fullname: requestedUserDoc.fullname,
				private: requestedUserDoc.private,
				followers: requestedUserDoc.followers,
				following: requestedUserDoc.following,
				posts: requestedUserDoc.posts.length,
				bio: requestedUserDoc.bio,
				createdAt: requestedUserDoc.createdAt,
				verified : requestedUserDoc.verified,
				_id: userResponse._id,
			}});
}
			if (requestedUserDoc.private && requestedUserDoc.followers.includes(requestingUserId))
				return next()

		return next();
  } catch (error) {
    console.error("Error in protectUserMiddleware:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export default protectUserMiddleware;
