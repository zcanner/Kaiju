import { Request, Response } from "express";
import User from "../../schemas/user.schema.js";

const getUser = async (req: Request, res: Response) => {
  const user = req.params.user;
  try {
    const userDoc = await User.findOne({ username: user }).select(
      "-password -email -blockedUsers -__v -_id -updatedAt"
    );
    if (!userDoc) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ userDoc });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Error in getUser controller:", errorMessage);
  }
};

export default getUser;
