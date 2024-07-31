import { Request, Response } from "express";

const logout = (req: Request, res: Response) => {
  try {
    res
      .clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .status(200)
      .send("Signed out successfully");
  } catch (error) {
    res.status(500).send("Failed to sign out");
  }
};
export default logout;
