import { Request, Response } from "express";

import User from "../../schemas/user.schema.js";
import mongoose from "mongoose";

const blockeUser = async (req: Request, res: Response) => {
  try {
    const user = res.locals.user;
    const u = req.query.u;
    if (u === user.username) throw new Error("You cannot block yourself");

    const userToBlock = await User.findOne({ username: u });
    if (!userToBlock) throw new Error("User not found");

    // check if user is already blocked, if yes then unblock
    if (user.blockedUsers.includes(userToBlock._id)) {
      user.blockedUsers.pull(userToBlock._id);
      res.status(200).send("User unblocked successfully");
      return await user.save();
    }

    /* before pushing the user into blockedUseers arr
       lets check if he follows the user to block. */

    if (user.following.includes(userToBlock._id)) {
      user.following = user.following.filter(
        (id: mongoose.Types.ObjectId) =>
          id.toString() !== userToBlock._id.toString()
      );
      await user.save();
    }

    // now lets check if the user to block follows our user

    if (user.followers.includes(userToBlock._id)) {
      user.followers = user.followers.filter(
        (id: mongoose.Types.ObjectId) =>
          id.toString() !== userToBlock._id.toString()
      );
      await user.save();
    }

    /* now lets check if user to block follows our lovely 
    innocent user who is getting Cyber bullied  */

    if (userToBlock.following.includes(user._id)) {
      userToBlock.following = userToBlock.following.filter(
        (id: mongoose.Types.ObjectId) => id.toString() !== user._id.toString()
      );
      await userToBlock.save();
    }

    // now lets check if user to block is followed by our user

    if (userToBlock.followers.includes(user._id)) {
      userToBlock.followers = userToBlock.followers.filter(
        (id: mongoose.Types.ObjectId) => id.toString() !== user._id.toString()
      );
      await userToBlock.save();
    }

    user.blockedUsers.push(userToBlock._id);
    await user.save();

    res.status(200).send("User blocked successfully");
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : null;
    console.log("Error Message form block user controller :", errorMessage);
    res.status(500).send("Failed to block user");
  }
};

export default blockeUser;
