import { Request, Response } from "express";
import Post from "../../schemas/posts.schema";

// this is basic posts controller that fetches all posts from the database
// TODO - implement pagination
// TODO - implement filtering
// TODO - persnalize posts based on user's interests
const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ posts });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ error: errorMessage });
  }
};

export default getPosts;
