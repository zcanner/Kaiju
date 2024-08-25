import { Request, Response } from "express";

import mongoose from "mongoose";
import User from "../../schemas/user.schema.js";

const follow = async (req: Request, res: Response) => {
  try {
    const { me } = req.body;
    const u = req.query.u;

    if (u === me) throw new Error("You cannot follow yourself");

    const userToFollowOrUnfollow = await User.findOne({ username: u });
    if (!userToFollowOrUnfollow) throw new Error("User not found");

    const user = await User.findOne({ username: me });
    if (!user) throw new Error("User not found");

    if (userToFollowOrUnfollow.followers.includes(user._id)) {
      /* 
			if the user is already following the user to follow,
			remove the user to follow from the followers list of the user to follow and
			remove the user to follow from the following list
			*/
      userToFollowOrUnfollow.followers =
        userToFollowOrUnfollow.followers.filter((id) => !id.equals(user._id));

      user.following = user.following.filter(
        (id: mongoose.Types.ObjectId) => !id.equals(userToFollowOrUnfollow._id)
      );

      res.status(204).send("Unfollowed successfully");
    } else {
      /* 
				If the user is not already following the user to follow, 
				add the user to follow to the followers list of the user to follow and 
				add the user to follow to the following list
			*/
      userToFollowOrUnfollow.followers.push(user._id);
      user.following.push(userToFollowOrUnfollow._id);

      res.status(200).send("Followed successfully");
    }
    await user.save();
    await userToFollowOrUnfollow.save();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : null;
    console.log(errorMessage);
    res.status(500).send("Failed to follow");
  }
};

export default follow;
