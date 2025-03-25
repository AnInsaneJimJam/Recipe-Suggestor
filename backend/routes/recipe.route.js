import express, { Router } from "express";
import {
	createRecipe,
	deleteRecipe,
	filterRecipes,
	getRecipes,
	updateRecipe,
} from "../controllers/recipe.controller.js";

const router = express.Router();

router.get("/", getRecipes);
router.post("/filter", filterRecipes);
// Making them admin control now --> Next feature will be this
router.post("/", createRecipe);
router.delete("/:id", deleteRecipe);
router.put("/:id", updateRecipe);

export default router;
