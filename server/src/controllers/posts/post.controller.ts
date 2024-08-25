import { Request, Response } from "express";

import Joi from "joi";
import sharp from "sharp";
import { v2 } from "cloudinary";

import Post from "../../schemas/posts.schema.js";
import User from "../../schemas/user.schema.js";

const foo = Joi.object({
  content: Joi.string().required(),
});

const createPost = async (req: Request, res: Response) => {
  try {
    const { data } = req.body;
    const user = res.locals.user._id;
    const { content, image, isReply, affiliatedPost } = data;
    const { error } = foo.validate({ content });
    if (error) throw new Error(`error validating ${error.message}`);

    let newPost = new Post({
      content: content,
      author: user,
    });

    const Author = await User.findById(user);
    if (!Author) return res.status(404).json({ error: "User not found" });

    Author.posts.push(newPost._id);

    if (image) {
      const buffer = Buffer.from(image.split(",")[1], "base64");

      const processedImageBuffer = await sharp(buffer)
        .jpeg({ quality: 80 })
        .toBuffer();

      // Upload processed image to Cloudinary
      const result = await new Promise((resolve, reject) => {
        const uploadStream = v2.uploader.upload_stream(
          { folder: "KAIJU/Posts/" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        uploadStream.end(processedImageBuffer);
      });

      // Add image URL to post
      newPost.image = (result as any).secure_url;
    }

    if (isReply) {
      const parentPost = await Post.findById(affiliatedPost);
      if (!parentPost)
        return res.status(404).json({ error: "Parent post not found" });

      newPost.isReply = isReply;
      newPost.affiliatedPost = affiliatedPost;
      parentPost.comments++;
      await parentPost.save();
    }

    await newPost.save();
    await Author.save();

    res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ error: errorMessage });
  }
};

// remove post controller
// Todo : remove post from cloudinary if it has an image.
const removePost = async (req: Request, res: Response) => {
  try {
    const postID = req.params.postID;
    const userID = res.locals.user.id;

    const post = await Post.findOne({ _id: postID });
    if (!post || post.author?.toString() !== userID)
      throw new Error("Post not found or unauthorized");

    const Author = await User.findById(userID);
    if (!Author) return res.status(404).json({ error: "User not found" });

    // if post has an image, remove it from cloudinary
    if (post.image) {
      const imageName = post.image.split("/").pop()?.split(".")[0];
      if (imageName) {
        await v2.uploader.destroy("KAIJU/Posts/" + imageName);
      }
    }

    // delete comments of the post if it has any (affiliatedPost)

    Author.posts.splice(Author.posts.indexOf(post._id), 1);
    await post.deleteOne(post._id);
    await Author.save();
    res.status(200).json({ message: "Post removed successfully" });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ error: errorMessage + "from delete post" });
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
      post.likes.splice(post.likes.indexOf(userID), 1);
      res.status(204).json({ message: "Post unliked" });
      await post.save();
    } else {
      post.likes.push(userID);
      res.status(201).json({ message: "Post liked" });
      await post.save();
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ error: errorMessage });
  }
};

export { createPost, removePost, updatePost, togglePostLike };
