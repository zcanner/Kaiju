import jwt from "jsonwebtoken";
import { Response } from "express";

function generateToken(id: string, res: Response) {
  const token = jwt.sign({ id }, process.env.JWT_SECRET as string);

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: false, // only send cookie over https
  });
}

export default generateToken;
