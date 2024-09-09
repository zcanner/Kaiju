import Joi from "joi";
import { Request, Response } from "express";

import User from "../../schemas/user.schema.js";
import generateToken from "../../lib/utils/jsonwebtoken.js";

const loginSchema = Joi.object({
  identity: Joi.string().required(),
  password: Joi.string().required(),
});

const login = async (req: Request, res: Response) => {
  const { identity, password } = req.body;
  const { error } = loginSchema.validate({ identity, password });

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const query = emailRegex.test(identity)
    ? { email: identity }
    : { username: identity };

  try {
    if (error) throw new Error(`error validating ${error.message}`);

    const user = await User.findOne(query);
    if (!user) throw new Error("user not found");

    if (user.password !== password) throw new Error("password is incorrect");

    generateToken(user._id.toString(), res);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : null;
    console.log("error message from login controller", errorMessage);
    res.status(400).send(errorMessage);
  }
};

export default login;
