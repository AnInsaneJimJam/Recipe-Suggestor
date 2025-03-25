import axios from "axios";

export const fetchAllRecipes = async () => {
	try {
		const res = await fetch("/api/recipes");
		const data = await res.json();
		return data;
	} catch (error) {
		console.error("Error fetching recipes:", error);
		throw error;
	}
};

export const fetchAllIngredients = async () => {
	try {
		const res = await fetch("/api/ingredients");
		const data = await res.json();
		return data;
	} catch (error) {
		console.error("Error fetching ingredients:", error);
		throw error;
	}
};

export const fetchRecipesByIngredients = async (selectedIngredients) => {
	try {
		const ingredientIds = selectedIngredients.map((ing) => ing.id);

		const response = await axios.post(`api/recipes/filter`, {
			ingredients: ingredientIds,
		});
		return response.data;
	} catch (error) {
		console.error("Error filtering recipes:", error);
		throw error;
	}
};
