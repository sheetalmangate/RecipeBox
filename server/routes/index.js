import { Router } from "express";
import authRoutes from "./authRoutes.js";
import apiRoutes from "./api/index.js";
import { authenticateToken } from "../middleware/auth.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/api", apiRoutes);

export default router;
