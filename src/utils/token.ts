import jwt from "jsonwebtoken";

interface Payload {
	id: string;
}

function generateToken(userInput: Payload): string {
	const token = jwt.sign(userInput, process.env.JWT_SECRET as string, {
		expiresIn: process.env.JWT_EXPIRY as string,
	});

	return token;
}

export { generateToken };
