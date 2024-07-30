import { Request, Response } from "express";
import User from "../../schemas/user.schema.js";
import { v2 } from "cloudinary";

const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user._id;
    const updatedUserData = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (updatedUserData.profileimg) {
      if (user.profileimg) {
        const imageName = user.profileimg.split("/").pop()?.split(".")[0];
        if (imageName) {
          await v2.uploader.destroy(imageName);
        }
      }
      const uploadedImage = await v2.uploader.upload(
        updatedUserData.profileimg,
        {
          folder: "KAIJU/ProfileImages/",
        }
      );
      updatedUserData.profileimg = uploadedImage.secure_url;
    }

    await User.updateOne({ _id: userId }, { $set: updatedUserData });
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Internal server error from update user";
    res.status(500).json({ error: errorMessage });
  }
};

export default updateUser;
