import { Request, Response } from "express";

import Post from "../../schemas/posts.schema.js";
import { v2 } from "cloudinary";

const createPost = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    let newPost = new Post({ ...data, author: res.locals.user._id });

    if (data.image) {
      const resImage = await v2.uploader.upload(data.image, {
        folder: "KAIJU/Posts/",
      });
      newPost.image = resImage.secure_url;
    }

    await newPost.save();
    res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ error: errorMessage });
  }
};

// remove post controller
const removePost = async (req: Request, res: Response) => {
  try {
    const { postID } = req.body;
    const userID = res.locals.user.id;

    const post = await Post.findOne({ _id: postID });
    if (!post || post.author?.toString() !== userID)
      throw new Error("Post not found or unauthorized");

    await Post.deleteOne({ _id: post });

    res.status(200).json({ message: "Post removed successfully" });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ error: errorMessage });
  }
};

const updatePost = async (req: Request, res: Response) => {
  const updatedData = req.body;
  const userID = res.locals.user.id;
  try {
    const { postID } = updatedData;
    let post = await Post.findOne({ _id: postID });
    if (!post) return res.status(404).json({ error: "Post not found" });

    if (post.author?.toString() !== userID)
      return res.status(401).json({ error: "Unauthorized" });

    await post.updateOne(updatedData, { runValidators: true });
    console.log(post);
    res.status(200).json({ message: "Post updated successfully" });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ error: errorMessage });
  }
};

const togglePostLike = async (req: Request, res: Response) => {
  try {
    const { postID } = req.body;
    const userID = res.locals.user.id;

    let post = await Post.findOne({ _id: postID });
    if (!post) return res.status(404).json({ error: "Post not found" });

    if (post.likes.includes(userID)) {
      post.likes = post.likes.filter((id) => id !== userID);
    } else {
      post.likes.push(userID);
    }

    await post.save();
    res.status(200).json({ message: "Post liked" });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ error: errorMessage });
  }
};

export { createPost, removePost, updatePost, togglePostLike };