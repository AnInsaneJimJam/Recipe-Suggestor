import express, { Router } from "express";
import {
	createIngredient,
	deleteIngredient,
	getIngredients,
	updateIngredient,
} from "../controllers/ingredient.controller.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.use(protect);

router.get("/", getIngredients);
// For Admin control now, may turn to feature later
router.post("/", createIngredient);
router.delete("/:id", deleteIngredient);
router.put("/:id", updateIngredient);

export default router;
