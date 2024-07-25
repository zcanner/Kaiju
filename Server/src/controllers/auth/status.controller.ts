import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const Status = async (req: Request, res: Response) => {
try {
	const token = req.cookies.token;
	if (!token) return res.json({ isAuth: false });
	const verify = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

	verify ? res.json({ isAuth: true }) : res.json({ isAuth: false });
} catch (error) {
	const errorMessage = error as Error; 
	res.status(500).json({ message: errorMessage.message || 'Internal Server Error' });
}
	
}

export default Status;