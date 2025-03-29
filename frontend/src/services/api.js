
// export const fetchAllRecipes = async () => {
// 	try {
// 		const res = await fetch("/api/recipes");
// 		const data = await res.json();
// 		return data;
// 	} catch (error) {
// 		console.error("Error fetching recipes:", error);
// 		throw error;
// 	}
// };

// export const fetchAllIngredients = async () => {
// 	try {
// 		const res = await fetch("/api/ingredients");
// 		const data = await res.json();
// 		return data;
// 	} catch (error) {
// 		console.error("Error fetching ingredients:", error);
// 		throw error;
// 	}
// };

// export const fetchRecipesByIngredients = async (selectedIngredients) => {
// 	try {
// 		const ingredientIds = selectedIngredients.map((ing) => ing.id);

// 		const response = await fetch("/api/recipes/filter", {
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 			body: JSON.stringify({
// 				ingredients: ingredientIds,
// 			}),
// 		});

// 		if (!response.ok) {
// 			throw new Error("Network response was not ok");
// 		}


// 		return await response.json();
// 	} catch (error) {
// 		console.error("Error filtering recipes:", error);
// 		throw error;
// 	}
// };

const apiRequest = async (url, options = {}) => {
	const token = localStorage.getItem("token");
	const headers = {
		"Content-Type": "application/json",
		...options.headers,
	};

	if (token) {
		headers["Authorization"] = `Bearer ${token}`;
	}

	try {
		const response = await fetch(url, {
			...options,
			headers,
		});

		if (response.status === 401) {
			// Handle unauthorized (token expired)
			localStorage.removeItem("token");
			window.location.href = "/login";
			return;
		}

		const data = await response.json();
		if (!response.ok) {
			throw new Error(data.message || "Network response was not ok");
		}

		return data;
	} catch (error) {
		console.error("API request failed:", error);
		throw error;
	}
};

export const fetchAllRecipes = async () => {
	return apiRequest("/api/recipes");
};

export const fetchAllIngredients = async () => {
	return apiRequest("/api/ingredients");
};

export const fetchRecipesByIngredients = async (selectedIngredients) => {
	const ingredientIds = selectedIngredients.map((ing) => ing.id);
	return apiRequest("/api/recipes/filter", {
		method: "POST",
		body: JSON.stringify({ ingredients: ingredientIds }),
	});
};

// Auth-related API calls
export const loginUser = async (credentials) => {
	return apiRequest("/api/auth/login", {
		method: "POST",
		body: JSON.stringify(credentials),
	});
};

export const registerUser = async (userData) => {
	return apiRequest("/api/auth/register", {
		method: "POST",
		body: JSON.stringify(userData),
	});
};

export const fetchCurrentUser = async () => {
	return apiRequest("/api/auth/me");
};