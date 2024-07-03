import { Request, Response } from "express";
import Joi from "joi";
import User from "../../schemas/user.schema";
import generateToken from "../../lib/utils/jsonwebtoken";

const loginSchema = Joi.object({
  identity: Joi.string().required(),
  password: Joi.string().required(),
});
async function login(req: Request, res: Response) {
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

    console.log(req.body);
    res.sendStatus(200);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : null;
    console.log(errorMessage);
    res.status(400).send(errorMessage);
  }
}

export default login;
