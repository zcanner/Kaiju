import { Request, Response } from "express";
import User from "../../schemas/user.schema";

/**
 * Updates the email of a user.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns A JSON response indicating the success or failure of the email update.
 * @throws If the user is not found, the password is incorrect, or the new email is the same as the old email.
 */
const updateEmail = async (req: Request, res: Response) => {
  try {
    const { newEmail, password } = req.body;
    const { user } = res.locals;

    const foundUser = await User.findById(user._id);
    if (!foundUser) throw new Error("User not found");

    const isPasswordValid = foundUser.password === password;

    if (!isPasswordValid) {
      throw new Error("Password is incorrect");
    }

    if (foundUser.email === newEmail) {
      throw new Error("New email cannot be the same as the old email");
    }

    foundUser.email = newEmail;
    await foundUser.save();
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : null;
    res.status(500).json({ error: errorMessage });
  }
};

export default updateEmail;
