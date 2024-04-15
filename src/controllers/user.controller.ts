import { Request, Response, NextFunction } from "express";
import { z as zod } from "zod";
import { User, userSchema } from "../zod/user.zod";
import { hash } from "../utils/crypto";
import { user } from "../db/schema";
import db from "../db/index";
import { eq } from "drizzle-orm";

const userController = {
    async makeUser(req: Request, res: Response, next: NextFunction) {
        try {
            // validating user details here
            const userDetailsOrError = userSchema.safeParse(req.body);

            if (!userDetailsOrError.success) {
                return res
                    .status(400)
                    .json({ error: userDetailsOrError.error.errors });
            }

            const userDetails: User = userDetailsOrError.data;

            // check if the email already exists
            const existingUser = await db
                .select()
                .from(user)
                .where(eq(user.email, userDetails.email));

            if (existingUser.length === 0) {
                return res.status(400).json({ error: "Email already exists" });
            }

            // Create a new user

            const hashedPassword: string = hash(userDetails.password);

            userDetails.password = hashedPassword;

            const newUser = await db.insert(user).values(userDetails);

            const userOutput = { ...newUser, password: undefined };

            res.json(userOutput);
        } catch (error) {
            // If the error is a zod error
            if (error instanceof zod.ZodError) {
                res.status(400).json({ error: error.errors });
            }
            next(error);
        }
    },
};

export { userController };
