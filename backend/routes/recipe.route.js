import express, { Router } from "express" ;
import { createRecipe, deleteRecipe, getRecipes, updateRecipe } from "../controllers/recipe.controller";

const ingredientRouter = express.Router();

Router.get("/", getRecipes);
Router.post("/", createRecipe);
Router.delete("/:id", deleteRecipe);
Router.put("/:id", updateRecipe);

export default ingredientRouter;

