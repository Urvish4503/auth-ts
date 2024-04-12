import { Request, Response, NextFunction } from "express";
import { z as zod } from "zod";
import { User } from "../schema/user.schema";
import { hash } from "../utils/crypto";
import prisma from "../utils/prisma";

const userController = {
    async makeUser(req: Request, res: Response, next: NextFunction) {
        try {
            // validating user details here
            const userDetails = User.safeParse(req.body);

            // check if the email already exists
            const existingUser = await prisma.user.findFirst({
                where: {
                    email: userDetails.email,
                },
            });

            if (existingUser) {
                return res.status(400).json({ error: "Email already exists" });
            }

            // Create a new user

            const hashedPassword: string = hash(userDetails.password);

            const user = await prisma.user.create({
                data: {
                    email: userDetails.email,
                    password: hashedPassword,
                    name: userDetails.name,
                },
            });

            const userOutput = { ...user, password: undefined };

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
