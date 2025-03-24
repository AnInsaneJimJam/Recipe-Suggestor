import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import ingredientRouter from "./routes/ingredient.route.js";
import recipeRouter from "./routes/recipe.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/ingredients", ingredientRouter);
app.use("/api/recipes", recipeRouter);

app.listen(5000, () => {
	connectDB();
	console.log("Server started at http://localhost:" + PORT);
});

//Full backend checked
