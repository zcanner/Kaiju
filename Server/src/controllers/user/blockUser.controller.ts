import { Request, Response } from "express";

import User from "../../schemas/user.schema.js";

const blockeUser = async (req: Request, res: Response) => {
  try {
    const user = res.locals.user;
    const u = req.query.u;
    if (u === user.username) throw new Error("You cannot block yourself");

    const userToBlock = await User.findOne({ username: u });
    if (!userToBlock) throw new Error("User not found");

    if (user.blockedUsers.includes(userToBlock._id))
      throw new Error("You are already blocked this user");

    user.blockedUsers.push(userToBlock._id);
    await user.save();

    console.log(u, user.username);
    res.status(200).send("User blocked successfully");
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : null;
    console.log("Error Message form block user controller :", errorMessage);
    res.status(500).send("Failed to block user");
  }
};

export default blockeUser;
