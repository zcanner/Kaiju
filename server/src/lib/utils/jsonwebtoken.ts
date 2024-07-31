import jwt from "jsonwebtoken";
import { Response } from "express";

const generateToken = (id: string, res: Response) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET as string);

  res
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year in ms
      secure: false, // only send cookie over https
    })
    .json({ message: "successful" })
    .status(201);
};

export default generateToken;
