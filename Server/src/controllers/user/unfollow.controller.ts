import { Request, Response } from "express";
import mongoose from "mongoose";

import User from "../../schemas/user.schema.js";

const unfollow = async (req: Request, res: Response) => {
  try {
    const user = res.locals.user;
    const u = req.query.u as string;

    if (u === user.username) throw new Error("You cannot unfollow yourself");

    const userToUnfollow = await User.findOne({ username: u });
    if (!userToUnfollow) throw new Error("User not found");

    if (!userToUnfollow.followers.includes(user._id))
      throw new Error("You are not following this user");

    userToUnfollow.followers = userToUnfollow.followers.filter(
      (id) => !id.equals(user._id)
    );

    user.following = user.following.filter(
      (id: mongoose.Types.ObjectId) => !id.equals(userToUnfollow._id)
    );

    await user.save();
    await userToUnfollow.save();
    res.status(200).send("Unfollowed successfully");
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : null;
    console.log(errorMessage);
    res.status(500).send("Failed to unfollow");
  }
};

export default unfollow;
