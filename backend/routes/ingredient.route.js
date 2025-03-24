import express, { Router } from "express";
import {
	createIngredient,
	deleteIngredient,
	getIngredients,
	updateIngredient,
} from "../controllers/ingredient.controller.js";

const router = express.Router();

router.get("/", getIngredients);
// For Admin control now, may turn to feature later
router.post("/", createIngredient);
router.delete("/:id", deleteIngredient);
router.put("/:id", updateIngredient);

export default router;
