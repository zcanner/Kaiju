import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import mongoose from 'mongoose';
import User from '../../schemas/user.schema.js';
import Post from '../../schemas/posts.schema.js';

const getUser = async (req: Request, res: Response) => {
  const isQuery = Object.keys(req.query).length > 0 && req.query.user;
  try {
    const token = req.cookies.token;
    let user = isQuery
      ? req.query.user
      : (jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload).id;
    user = token && req.query.user ? req.query.user : user;

    if (!user) {
      return res.status(404).json({ message: 'No user provided' });
    }

    let foundUser;
    if (mongoose.Types.ObjectId.isValid(user)) {
      foundUser = await User.findById(user).select('-password -email -__v -updatedAt');
    } else {
      foundUser = await User.findOne({ username: user }).select('-password -email -__v -updatedAt');
    }

    if (!foundUser) {
      return res.status(404).json({ message: 'User not found from get user' });
    }

    const userDoc = {
      ...foundUser.toObject(),
      posts: foundUser.posts.length,
    };

    res.status(200).json({ userDoc });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in getUser controller:', errorMessage);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getUserPosts = async (req: Request, res: Response) => {
  const { reply } = req.query;
  const { author } = req.params;

  try {
    const posts = await Post.find(
      reply ? { isReply: true, author } : { isReply: false, author }
    ).populate('author', '-password -email -__v');
    res.status(200).json({ posts });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ message: errorMessage });
  }
};

export { getUser, getUserPosts };
