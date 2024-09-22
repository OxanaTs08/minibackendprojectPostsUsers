import { Router } from "express";
import {
  createPlaceController,
  placeGetController,
} from "../controllers/auth.js";
import authenticateJWT from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", authenticateJWT, createPlaceController);

router.get("/", authenticateJWT, placeGetController);

export default router;
