import { Request, Response } from "express";
import User from "../../schemas/user.schema.js";
import jwt, { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";

const getUser = async (req: Request, res: Response) => {
  const isQuery = Object.keys(req.query).length > 0;
  try {
    const token = req.cookies.token;
    let user = isQuery
      ? req.query.user
      : (jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload).id;
    user = token && req.query.user ? req.query.user : user;

    if (!user) {
      return res.status(404).json({ message: "No user provided" });
    }

    let userDoc;
    if (mongoose.Types.ObjectId.isValid(user)) {
      userDoc = await User.findById(user).select(
        "-password -email -__v -updatedAt"
      );
    } else {
      userDoc = await User.findOne({ username: user }).select(
        "-password -email -__v -updatedAt"
      );
    }

    if (!userDoc) {
      return res.status(404).json({ message: "User not found from get user" });
    }

    res.status(200).json({ userDoc });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Error in getUser controller:", errorMessage);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default getUser;