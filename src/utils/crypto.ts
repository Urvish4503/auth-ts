import { scryptSync, randomBytes, timingSafeEqual } from "crypto";

function hash(password: string): string {
	const salt = randomBytes(8).toString("hex");
	const hashedPassword = scryptSync(password, salt, 64).toString("hex");

	return `${hashedPassword}:${salt}`;
}

function comparePass(password: string, hashedPassword: string): boolean {
	const [hashed, salt] = hashedPassword.split(":");
	const keyBuffer = Buffer.from(hashed, "hex");
	const userInput = scryptSync(password, salt, 64);

	const match = timingSafeEqual(keyBuffer, userInput);

	return match;
}
export { hash, comparePass };
