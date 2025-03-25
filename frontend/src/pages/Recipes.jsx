import React, { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import { fetchAllRecipes } from "../services/api";

function Recipes() {
	const [recipes, setRecipes] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const loadRecipes = async () => {
			try {
				const response = await fetchAllRecipes();
				
				//Ai helped in error handling
				const recipesData = Array.isArray(response)
					? response
					: response?.success
					? response.data
					: [];

				if (!Array.isArray(recipesData)) {
					throw new Error("Invalid recipes data format");
				}

				setRecipes(recipesData);
			} catch (err) {
				setError(err.message);
				console.error("Recipe fetch error:", err);
			} finally {
				setLoading(false);
			}
		};

		loadRecipes();
	}, []);

	if (loading) {
		return (
			<div className="container mx-auto px-4 py-8 text-center">
				<div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
				<p className="mt-2 text-gray-600">Loading recipes...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="container mx-auto px-4 py-8 text-center">
				<p className="text-red-500">Error loading recipes</p>
				<p className="text-sm text-gray-600 mt-2">{error}</p>
				<button
					onClick={() => window.location.reload()}
					className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
				>
					Retry
				</button>
			</div>
		);
	}

	if (recipes.length === 0) {
		return (
			<div className="container mx-auto px-4 py-8 text-center">
				<p className="text-gray-500">No recipes found</p>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-8 text-center">My Recipes</h1>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{recipes.map((recipe) => (
					<RecipeCard
						key={recipe._id || recipe.id}
						recipe={{
							...recipe,
							id: recipe._id || recipe.id,
							ingredients: Array.isArray(recipe.ingredients)
								? recipe.ingredients.map((ing) => ({
										id: ing._id || ing.id,
										name: ing.name || ing.title,
								  }))
								: [],
						}}
					/>
				))}
			</div>
		</div>
	);
}

export default Recipes;
