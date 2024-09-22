import { Router } from "express";
import { tagGetController, createTagController } from "../controllers/auth.js";
import authenticateJWT from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", authenticateJWT, createTagController);

router.get("/", tagGetController);

export default router;
