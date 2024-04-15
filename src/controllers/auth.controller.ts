import { Request, Response, NextFunction } from "express";
import { z as zod } from "zod";
import { userSchema } from "../zod/user.zod";
import { comparePass } from "../utils/crypto";
import { generateToken } from "../utils/token";
import { user } from "../db/schema";
import db from "../db/index";
import { eq } from "drizzle-orm";

const authController = {
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const userDetails = userSchema.safeParse(req.body);

            if (!userDetails.success) {
                return res
                    .status(400)
                    .json({ error: userDetails.error.errors });
            }

            const userData = await db
                .select({
                    id: user.id,
                    password: user.password,
                    userName: user.userName,
                })
                .from(user)
                .where(eq(user.email, userDetails.email));

            if (!userData) {
                return res.status(404).json({ error: "Email not found" });
            }

            const isValid = comparePass(
                userDetails.password,
                userData.password,
            );

            if (!isValid) {
                return res.status(400).json({ error: "Invalid password" });
            }

            const token = generateToken({ id: userData. });

            res.cookie("token", token, {
                httpOnly: true,
            })
                .status(200)
                .json({ message: "Logged in successfully" });
        } catch (error) {
            if (error instanceof zod.ZodError) {
                res.status(400).json({ error: error.errors });
            }

            next(error);
        }
    },
};

export { authController };
