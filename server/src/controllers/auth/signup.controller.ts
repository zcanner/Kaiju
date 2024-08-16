import { Request, Response } from "express";
import Joi from "joi";

import User from "../../schemas/user.schema.js";
import generateToken from "../../lib/utils/jsonwebtoken.js";

/* sign up user data validation schema */
const userDataSchema = Joi.object({
  username: Joi.string().required().min(4).max(15),
  fullname: Joi.string().required().min(4).max(15),
  email: Joi.string()
    .required()
    .email({ tlds: { allow: true } }),
  password: Joi.string().required().min(6).max(14),
});

interface Ibody {
  username: string;
  fullname: string;
  email: string;
  password: string;
}

const signup = async (req: Request, res: Response) => {
  try {
    const data: Ibody = req.body;

    const { error } = await userDataSchema.validateAsync(data);
    if (error) throw new Error(`error validating ${error.message}`);

    /* check if user already exists */
    const existingEmail = await User.findOne({ email: data.email });
    if (existingEmail) throw new Error("Email already exists");

    const existingUser = await User.findOne({ username: data.username });
    if (existingUser) throw new Error("username is taken");

    const user = new User({ ...data });

    await user.save();
    generateToken(user._id.toString(), res);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : null;

    console.log(errorMessage);
    res.status(400).send(errorMessage);
  }
};

export default signup;
