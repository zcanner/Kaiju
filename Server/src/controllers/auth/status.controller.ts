import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../../schemas/user.schema";

const status = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json({ isAuth: false });
    const verify = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    const user = await User.findOne({ _id: verify.id }).select(
      "-password -email"
    );

    verify ? res.json({ isAuth: true, user }) : res.json({ isAuth: false });
  } catch (error) {
    const errorMessage = error as Error;
    res
      .status(500)
      .json({ message: errorMessage.message || "Internal Server Error" });
  }
};

export default status;
