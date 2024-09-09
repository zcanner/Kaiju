import { Request, Response } from "express";
import User from "../../schemas/user.schema";

/**
 * Updates the password of a user.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns A JSON response indicating the success or failure of the password update.
 * @throws If the user is not found, the old password is incorrect, or the new password is the same as the old password.
 */
const updatePassword = async (req: Request, res: Response) => {
  try {
    const { newPassword, oldPassword } = req.body;
    const { user } = res.locals;

    const foundUser = await User.findById(user._id);
    if (!foundUser) throw new Error("User not found");

    if (foundUser.password !== oldPassword) {
      throw new Error("Old password is incorrect");
    }

    if (foundUser.password === newPassword) {
      throw new Error("New password cannot be the same as the old password");
    }

    foundUser.password = newPassword;
    await foundUser.save();
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : null;
    res.status(500).json({ error: errorMessage });
  }
};

export default updatePassword;
