import { Request, Response } from "express";
import User from "../../schemas/user.schema";
import { boolean } from "joi";

const togglePrivatePublic = async (req: Request, res: Response): Promise<void> => {
	try {
		const { user } = res.locals;
		const { isPrivate } = req.body;
		const foundUser = await User.findOneAndUpdate( { _id: user._id }, { private: isPrivate });
		if (!foundUser) throw new Error("User not found");

		
		await foundUser.save();
		const isPrivateAccount : boolean = isPrivate;

		const message = isPrivateAccount ? "Account privacy set to private" : "Account privacy set to public";
		res.json({ message: message });

	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : "Something went wrong";
		res.status(400).json({ error: errorMessage });
	}
};

export default togglePrivatePublic;