import { Router } from "express";
import { tagGetController } from "../controllers/auth.js";
// import authenticateJWT from "../middleware/authMiddleware.js";

const router = Router();

// router.post("/tags", authenticateJWT, createTagController);

router.get("/tags", tagGetController);

export default router;
