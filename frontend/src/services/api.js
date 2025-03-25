import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export const fetchAllRecipes = async () => {
	try {
		const response = await axios.get(`${API_BASE_URL}/recipes`);
		return response.data;
	} catch (error) {
		console.error("Error fetching recipes:", error);
		throw error;
	}
};

export const fetchAllIngredients = async () => {
	try {
		const response = await axios.get(`${API_BASE_URL}/ingredients`);
		return response.data;
	} catch (error) {
		console.error("Error fetching ingredients:", error);
		throw error;
	}
};

export const fetchRecipesByIngredients = async (selectedIngredients) => {
	try {
		const ingredientIds = selectedIngredients.map((ing) => ing.id);

		const response = await axios.post(`${API_BASE_URL}/recipes/filter`, {
			ingredients: ingredientIds,
		});
		return response.data;
	} catch (error) {
		console.error("Error filtering recipes:", error);
		throw error;
	}
};
