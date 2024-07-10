import { NextFunction, Request, Response } from "express";

/**
 * Asynchronous function to handle protected routes.
 * reject req if token is found. ✅
 */
const authRedirect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;
    if (token) throw new Error("You are already logged in");
    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : null;
    console.log(errorMessage);
    res.status(401).send(errorMessage);
  }
};

export default authRedirect;
