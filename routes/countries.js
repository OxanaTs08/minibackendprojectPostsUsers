import { Router } from "express";
import {
  createCountryController,
  countryGetController,
} from "../controllers/auth.js";
import authenticateJWT from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", authenticateJWT, createCountryController);

router.get("/", countryGetController);

export default router;
