import express, { Router } from "express" ;
import { createIngredient, deleteIngredient, getIngredients, updateIngredient } from "../controllers/ingredient.controller";

const ingredientRouter = express.Router();

Router.get("/", getIngredients);
// For Admin control now, may turn to feature later
Router.post("/", createIngredient);
Router.delete("/:id", deleteIngredient);
Router.put("/:id", updateIngredient);

export default ingredientRouter;
