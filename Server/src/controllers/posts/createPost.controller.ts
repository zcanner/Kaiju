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

export default createPost;
