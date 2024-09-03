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
    // Fetch all posts from the database and populate the author field with the user's details
    // Exclude posts where the author is in the user's blocked list or the user is in the author's blocked list
    const posts = await Post.find(query)
      .populate({
        path: "author",
        select: "-password -email -followers -following -bio -__v",
        match: {
          $and: [
            { _id: { $nin: user.blockedUsers } },
            { blockedUsers: { $ne: user._id } },
						{ private : false } || { _id: { $in: user.following } }
          ],
        },
      })
      .sort({ createdAt: -1 });

    // Filter out posts where the author is null (due to the populate match condition)
    const filteredPosts = posts.filter((post) => post.author !== null);

    res.status(200).json({ posts: filteredPosts });
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
