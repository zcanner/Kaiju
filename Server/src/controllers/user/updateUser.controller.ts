import { Request, Response } from "express";
import User from "../../schemas/user.schema.js";

const updateUser = async (req: Request, res: Response) => {
  try {
    // Retrieve user ID from request parameters
    const userId = res.locals.user._id;
    // Retrieve updated user data from request body
    const updatedUserData = req.body;

    // find user in the data base and update it

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user data
    await user.updateOne(updatedUserData);
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ error: errorMessage });
  }
};

export default updateUser;
