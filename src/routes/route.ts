import { IRouter, Router } from "express";
import { userController } from "../controllers/user.controller";
import { authController } from "../controllers/auth.controller";

const router: IRouter = Router();

router.post("/", userController.makeUser);
router.get("/login", authController.login);

export default router;
