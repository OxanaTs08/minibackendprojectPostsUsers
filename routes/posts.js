import { Router } from "express";
import {
  createPostController,
  postGetController,
} from "../controllers/auth.js";
import authenticateJWT from "../middleware/authMiddleware.js";
const router = Router();

router.post("/", authenticateJWT, createPostController);

router.get("/", authenticateJWT, postGetController);

export default router;
