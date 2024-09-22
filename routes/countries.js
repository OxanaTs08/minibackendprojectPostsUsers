import { Router } from "express";
import {
  createCountryController,
  countryGetController,
} from "../controllers/auth.js";
import authenticateJWT from "../middleware/authMiddleware.js";

const router = Router();

router.post("/countries", authenticateJWT, createCountryController);

router.get("/countries", countryGetController);

export default router;
