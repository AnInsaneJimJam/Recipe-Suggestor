import Recipe from "../models/recipe.model.js";
import Ingredient from "../models/ingredient.model.js";
import { Op } from "sequelize";

export const getRecipes = async (req, res) => {
	try {
		const recipes = await Recipe.findAll({
			include: [Ingredient],
		});
		res.status(200).json({ success: true, data: recipes });
	} catch (error) {
		console.error("Error in Fetching Recipes:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const filterRecipes = async (req, res) => {
	try {
		const { ingredients } = req.body;

		// Find all recipes with their ingredients
		const allRecipes = await Recipe.findAll({
			include: [Ingredient],
		});

		const matchingRecipes = allRecipes.filter((recipe) => {
			const recipeIngredientIds = recipe.Ingredients.map((ing) => ing.id);
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
	const { name, ingredients, procedure, image } = req.body;

	if (!name || !ingredients || !procedure || !image) {
		return res
			.status(400)
			.json({ success: false, message: "Please provide all fields" });
	}

	try {
		const newRecipe = await Recipe.create({
			name,
			procedure,
			image,
		});

		const ingredientInstances = await Ingredient.findAll({
			where: { id: { [Op.in]: ingredients } },
		});

		await newRecipe.addIngredients(ingredientInstances);

		const createdRecipe = await Recipe.findByPk(newRecipe.id, {
			include: [Ingredient],
		});

		res.status(200).json({ success: true, data: createdRecipe });
	} catch (error) {
		console.error("Error in Creating Recipe:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const deleteRecipe = async (req, res) => {
	const { id } = req.params;

	try {
		const recipe = await Recipe.findByPk(id);
		if (!recipe) {
			return res.status(404).json({
				success: false,
				message: "Recipe not found",
			});
		}

		await recipe.destroy();
		res.status(200).json({ success: true, message: "Recipe deleted" });
	} catch (error) {
		console.error("Error in deleting recipe:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const updateRecipe = async (req, res) => {
	const { id } = req.params;
	const { name, ingredients, procedure, image } = req.body;

	try {
		const recipe = await Recipe.findByPk(id);
		if (!recipe) {
			return res.status(404).json({
				success: false,
				message: "Recipe not found",
			});
		}

		await recipe.update({ name, procedure, image });

		if (ingredients && ingredients.length > 0) {
			const ingredientInstances = await Ingredient.findAll({
				where: { id: { [Op.in]: ingredients } },
			});
			await recipe.setIngredients(ingredientInstances);
		}
		const updatedRecipe = await Recipe.findByPk(id, {
			include: [Ingredient],
		});

		res.status(200).json({ success: true, data: updatedRecipe });
	} catch (error) {
		console.error("Error in updating recipe", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};
