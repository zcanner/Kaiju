import { Request, Response } from "express";
import Saved from "../../schemas/saved.schema";

const getSaved = async (req: Request, res: Response) => {
  const { userID } = req.params;
  // Fetch saved posts
  try {
    const savedPosts = await Saved.find({ user: userID }).populate({
      path: "post",
      populate: {
        path: "author",
        select: "-password -email -followers -following -__v -bio -posts",
      },
    });
    if (!savedPosts) {
      return res.status(404).json({ message: "No saved posts found" });
    }

    return res.status(200).json(savedPosts);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : null;
    console.log("error from getSaved controller", errorMessage);
  }
};

export default getSaved;
