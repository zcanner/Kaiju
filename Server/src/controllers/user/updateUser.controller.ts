import { Request, Response } from "express";
import User from "../../schemas/user.schema.js";
import { v2 } from "cloudinary";

const updateUser = async (req: Request, res: Response) => {
  try {
    // Retrieve user ID from request parameters
    const userId = res.locals.user._id;
    // Retrieve updated user data from request body
    let updatedUserData = req.body;

    // find user in the data base and update it

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.profileimg) {
      // If user is updating profile image, delete the previous image from cloudinary
      const imageName = user.profileimg.split("/").pop()?.split(".")[0];
      if (imageName) {
        await v2.uploader.destroy(imageName);
      }
      // Update profile image in cloudinary
      const image = updatedUserData.profileimg;
      const uploadedImage = await v2.uploader.upload(image, {
        folder: "KAIJU/ProfileImages/",
      });
      updatedUserData.profileimg = uploadedImage.secure_url;
    }
    console.log(updatedUserData);
    // Update user data
    await user.updateOne(updatedUserData, { runValidators: true });
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ error: errorMessage });
  }
};

export default updateUser;
