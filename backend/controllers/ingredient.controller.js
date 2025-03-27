import Ingredient from "../models/ingredient.model.js";

export const getIngredients = async (req, res) => {
	try {
		const ingredients = await Ingredient.findAll();
		res.status(200).json({ success: true, data: ingredients });
	} catch (error) {
		console.error("Error in Fetching Ingredients:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const createIngredient = async (req, res) => {
	const { name, image } = req.body;

	if (!name || !image) {
		return res.status(400).json({
			success: false,
			message: "Please provide both name and image",
		});
	}

	try {
		const newIngredient = await Ingredient.create({ name, image });
		res.status(201).json({ success: true, data: newIngredient });
	} catch (error) {
		console.error("Error in creating ingredient:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const deleteIngredient = async (req, res) => {
	const { id } = req.params;

	try {
		const ingredient = await Ingredient.findByPk(id);
		if (!ingredient) {
			return res.status(404).json({
				success: false,
				message: "Ingredient not found",
			});
		}

		await ingredient.destroy();
		res.status(200).json({ success: true, message: "Ingredient deleted" });
	} catch (error) {
		console.error("Error in deleting Ingredient:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const updateIngredient = async (req, res) => {
	const { id } = req.params;
	const { name, image } = req.body;

	try {
		const ingredient = await Ingredient.findByPk(id);
		if (!ingredient) {
			return res.status(404).json({
				success: false,
				message: "Ingredient not found",
			});
		}

		const updatedIngredient = await ingredient.update({ name, image });
		res.status(200).json({ success: true, data: updatedIngredient });
	} catch (error) {
		console.error("Error in updating ingredient", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};