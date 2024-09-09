import { Request, Response } from "express";
import User from "../../schemas/user.schema";

/**
 * Retrieves the list of blocked users for the authenticated user.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the list of blocked users or an error message.
 * @throws {Error} - If the authenticated user is not found.
 */
const getBlockedUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user } = res.locals;

    const foundUser = await User.findById(user._id);
    if (!foundUser) throw new Error("User not found");

    const blockedUsers = await User.find({
      _id: { $in: foundUser.blockedUsers },
    });
    res.status(200).json({ blockedUsers });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : null;
    res.status(500).json({ error: errorMessage });
  }
};

export default getBlockedUsers;
