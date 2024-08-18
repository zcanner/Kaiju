import { Request, Response } from "express";
import Post from "../../schemas/posts.schema";

// TODO : merge getPosts and getPost into one controller that can handle both requests

// this is basic posts controller that fetches all posts from the database
// TODO - implement pagination
// TODO - implement filtering
// TODO - persnalize posts based on user's interests
const getPosts = async (req: Request, res: Response) => {
  const { t, pID } = req.query;
  const user = res.locals.user;

  let query = {};

  switch (t) {
    case "For You":
      query = { isReply: false };
      break;
    case "following":
      query = { author: { $in: user.following }, isReply: false };
      break;
    case "comment":
      query = { isReply: true, affiliatedPost: pID };
      break;
    default:
      query = { isReply: false };
      break;
  }

  try {
    const posts = await Post.find(query).populate(
      "author",
      "-password -email -__v"
    );

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
    // increment the views count when the post is viewed
    post.views++; // increment the views count
    res.status(200).json({ post });
    post.save();
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ error: errorMessage });
  }
};

export { getPosts, getPost };
