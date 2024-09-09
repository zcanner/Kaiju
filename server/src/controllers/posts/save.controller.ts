import { Request, Response } from "express";

import Saved from "../../schemas/saved.schema";
import Post from "../../schemas/posts.schema";

const save = async (req: Request, res: Response) => {
  try {
    const { postID } = req.body;
    const user = res.locals.user._id;

    // Check if the post is already saved
    const post = await Saved.findOne({ user, post: postID });
    if (post) {
      // If saved, remove the post from the saved array
      await Saved.findOneAndUpdate(
        { user },
        { $pull: { post: postID } },
        { new: true }
      );
      await post.save();
      return res.status(200).json({ message: "Post unsaved" });
    }

    // Check if the post exists
    const postExists = await Post.findById(postID);
    if (!postExists) return res.status(404).json({ error: "Post not found" });

    // check if saved object exists for the user.
    const saved = await Saved.findOne({ user });
    // If not, create a new saved object
    if (!saved) {
      const newSaved = new Saved({
        user,
        post: [postID],
      });

      await newSaved.save();
    } else {
      // If exists, push the postID to the post array
      saved.post.push(postID);
      await saved.save();
    }

    return res.status(200).json({ message: "Post saved" });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    return res.status(500).json({ error: errorMessage });
  }
};

export default save;
