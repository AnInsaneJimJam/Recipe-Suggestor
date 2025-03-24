import express, { Router } from "express" ;
import { createRecipe, deleteRecipe, getRecipes, updateRecipe } from "../controllers/recipe.controller.js";

const router = express.Router();

router.get("/", getRecipes);
// Making them admin control now --> Next feature will be this
router.post("/", createRecipe);
router.delete("/:id", deleteRecipe);
router.put("/:id", updateRecipe);

export default router;

