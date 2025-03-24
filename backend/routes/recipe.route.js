import express, { Router } from "express" ;
import { createRecipe, deleteRecipe, getRecipes, updateRecipe } from "../controllers/recipe.controller.js";

const router = express.Router();

router.get("/", getRecipes);
router.post("/", createRecipe);
router.delete("/:id", deleteRecipe);
router.put("/:id", updateRecipe);

export default router;

