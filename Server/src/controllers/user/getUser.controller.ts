import { Request, Response } from "express";
import User from "../../schemas/user.schema.js";
import jwt, { JwtPayload } from "jsonwebtoken";

const getUser = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;

    let user = token
      ? (jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload).id
      : req.query.user;

    user = token && req.query.user ? req.query.user : user;

    if (!user) {
      return res.status(404).json({ message: "No user provided" });
    }

    const userDoc = await User.findOne({ username: user }).select(
      "-password -email -blockedUsers -__v -_id -updatedAt"
    );
    if (!userDoc) {
      return res.status(404).json({ message: "User not found from get user" });
    }

    res.status(200).json({ userDoc });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Error in getUser controller:", errorMessage);
  }
};

export default getUser;
