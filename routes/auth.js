import { Router } from "express";
import { registerController, loginController } from "../controllers/auth.js";
import authenticateJWT from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register", registerController);

router.post("/login", loginController, authenticateJWT);

export default router;
