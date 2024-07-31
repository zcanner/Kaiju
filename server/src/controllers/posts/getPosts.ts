import { Request, Response } from "express";
import Post from "../../schemas/posts.schema";

// TODO : merge getPosts and getPost into one controller that can handle both requests

// this is basic posts controller that fetches all posts from the database
// TODO - implement pagination
// TODO - implement filtering
// TODO - persnalize posts based on user's interests
const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find().populate("author", "-password -email -__v");
    res.status(200).json({ posts });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ error: errorMessage });
  }
};

const getPost = async (req: Request, res: Response) => {
  try {
    const id = req.params.postID;
    const post = await Post.findById(id).populate(
      "author",
      "_id fullname username followers following verified profileimg"
    );
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json({ post });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ error: errorMessage });
  }
};

export { getPosts, getPost };
