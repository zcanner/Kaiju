import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../schemas/user.schema.js";

/**
 * Asynchronous function to handle protected routes.
 * reject if token is not valid or if user is not found
 */
const protectedRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;
    if (!token) throw new Error("Unauthorized");

    const verify = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    if (!verify) throw new Error("Unauthorized");

    const user = await User.findById(verify.id).select("-password");
    if (!user) throw new Error("No user");

    res.locals.user = user;
    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : null;
    console.log("error from protected middelware", errorMessage);
    res.status(401).send(errorMessage);
  }
};

export default protectedRoute;
