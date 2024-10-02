import { Router } from "express";
import { userRouter } from "./userRoutes.js";
import { recipeRouter } from "./recipeRoutes.js";
import { nutritionRouter } from "./nutritionRoutes.js";

const router = Router();

router.use("/users", userRouter);
router.use("/recipes", recipeRouter);
router.use("/nutrition", nutritionRouter);

export default router;
