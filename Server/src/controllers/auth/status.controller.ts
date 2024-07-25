import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const Status = async (req: Request, res: Response) => {
try {
	const token = req.cookies.token;
!token && res.status(401).json({ message: 'Unauthorized' });

	const verify = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
	verify ? res.status(200).json({ isAuth: true}) : res.status(401).json({ isAuth: false });
} catch (error) {
	const errorMessage = error as Error; 
	res.status(500).json({ message: errorMessage.message || 'Internal Server Error' });
}
	
}

export default Status;