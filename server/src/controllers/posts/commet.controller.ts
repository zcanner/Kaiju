import { Request, Response } from "express";

import Post from "../../schemas/posts.schema.js";

const comment = async (req: Request, res: Response) => {
  const postID = req.params.postID;
  const { content } = req.body;

  try {
    const post = await Post.findById(postID);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.comments.push({ text: content, user: res.locals.user._id });
    await post.save();

    res.status(201).json({ message: "Comment created successfully" });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ error: errorMessage });
  }
};

/**
 * function to handle like comment request from client
 */
const likeComment = async (req: Request, res: Response) => {
  const postID = req.params.postID;
  const commentID = req.params.commentID;

  try {
    const post = await Post.findById(postID);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = post.comments.id(commentID);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    const userIndex = comment.likes.indexOf(res.locals.user._id);
    if (userIndex === -1) {
      comment.likes.push(res.locals.user._id);
    } else {
      comment.likes.splice(userIndex, 1);
    }

    await post.save();
    res.status(200).json({ message: "Comment liked successfully" });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ error: errorMessage });
  }
};

/**
 * function to handle delete comment request from client
 */
const deleteComment = async (req: Request, res: Response) => {
  const postID = req.query.pid;
  const commentID = req.query.cid;

  try {
    const post = await Post.findById(postID);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = post.comments.id(commentID);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    const isAuthor = post.author?.toString() === res.locals.user.id;
    const isCommentAuthor = comment.user?.toString() === res.locals.user.id;

    if (!isAuthor && !isCommentAuthor) {
      return res.status(403).json({ message: "You are unauthorized" });
    }

    post.comments.pull(commentID);
    await post.save();
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ error: errorMessage });
  }
};

export { comment, likeComment, deleteComment };
