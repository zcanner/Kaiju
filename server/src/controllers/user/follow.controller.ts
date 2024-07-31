import { Request, Response } from "express";

import User from "../../schemas/user.schema.js";

const follow = async (req: Request, res: Response) => {
  try {
    const user = res.locals.user;
    const u = req.query.u;

    if (u === user.username) throw new Error("You cannot follow yourself");

    const userToFollow = await User.findOne({ username: u });
    if (!userToFollow) throw new Error("User not found");

    if (userToFollow.followers.includes(user._id))
      throw new Error("You are already following this user");

    // add the user to the list of followers of user to follow.
    userToFollow.followers.push(user._id);
    // add the user to the list of following of user.
    user.following.push(userToFollow._id);

    await userToFollow.save();
    await user.save();
    res.status(200).send("Followed successfully");
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : null;
    console.log(errorMessage);
    res.status(500).send("Failed to follow");
  }
};

export default follow;
