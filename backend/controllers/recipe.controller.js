import { Mongoose } from "mongoose";
import Recipe from "../models/recipe.model.js";

export const getRecipes = async (req, res) => {
	try {
		const recipes = await Recipe.find({});
		res.status(200).json({ success: true, data: recipes });
	} catch (error) {
		console.error("error in Fetching Recipes:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const filterRecipes = async (req, res) => {
	try {
		const { ingredients } = req.body;

		const allRecipes = await Recipe.find().populate("ingredients");

		//check for subset
		const matchingRecipes = allRecipes.filter((recipe) => {
			const recipeIngredientIds = recipe.ingredients.map((ing) =>
				ing._id.toString()
			);
			return recipeIngredientIds.every((ingId) =>
				ingredients.includes(ingId)
			);
		});

		res.json({
			success: true,
			count: matchingRecipes.length,
			data: matchingRecipes,
		});
	} catch (error) {
		console.error("Error filtering recipes:", error.message);
		res.status(500).json({
			success: false,
			message: "Server Error",
			error: error.message,
		});
	}
};

export const createRecipe = async (req, res) => {
	const recipe = req.body;

	if (
		!recipe.name ||
		!recipe.ingredients.length ||
		!recipe.procedure ||
		!recipe.image
	) {
		return res
			.status(400)
			.json({ success: false, message: "Please provide all fields" });
	}

	const newRecipe = new Recipe(recipe);

	try {
		await newRecipe.save();
		res.status(200).json({ success: true, data: newRecipe });
	} catch (error) {
		console.error("Error in Creating Recipe:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const deleteRecipe = async (req, res) => {
	const { id } = req.params;

	if (!Mongoose.Types.ObjectId.isValid(id)) {
		return res
			.status(404)
			.json({ success: false, message: "Invlid Recipe Id" });
	}

	try {
		await Recipe.findIdAndDelete(id);
		res.status(200).json({ success: true, message: "Recipe deleted" });
	} catch (error) {
		console.error("error in deleting recipe:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const updateRecipe = async (req, res) => {
	const { id } = req.params;
	const recipe = req.body;

	if (!Mongoose.Types.ObjectId.isValid(id)) {
		return res
			.status(404)
			.json({ success: false, message: "Invlid Recipe Id" });
	}
	// need to check if can be updated with less fields?
	try {
		await Recipe.findByIdAndUpdate(id, recipe, { new: true });
		res.status(200).json({ success: true, data: recipe });
	} catch (error) {
		console.error("error in updating recipe", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};
