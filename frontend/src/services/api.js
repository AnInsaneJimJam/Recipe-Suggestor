
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

		const response = await fetch("/api/recipes/filter", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				ingredients: ingredientIds,
			}),
		});

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}


		return await response.json();
	} catch (error) {
		console.error("Error filtering recipes:", error);
		throw error;
	}
};