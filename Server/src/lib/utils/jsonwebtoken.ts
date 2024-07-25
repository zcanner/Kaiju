import jwt from "jsonwebtoken";
import { Response } from "express";

const generateToken = (id: string, res: Response) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET as string);

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: false, // only send cookie over https
  }).json({ message : "successful" }).sendStatus(201);
};

export default generateToken;
