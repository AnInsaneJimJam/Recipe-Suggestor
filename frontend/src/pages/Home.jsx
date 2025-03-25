import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useIngredientContext } from "../contexts/IngredientContext";
import { fetchRecipesByIngredients } from "../services/api";
import RecipeCard from "../components/RecipeCard";

const Home = () => {
	const { selectedIngredient } = useIngredientContext();
	const [matchingRecipes, setMatchingRecipes] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchRecipes = async () => {
			if (selectedIngredient.length > 0) {
				setLoading(true);
				try {
					const response = await fetchRecipesByIngredients(
						selectedIngredient
					);
					const recipes = response.data || [];
					setMatchingRecipes(...matchingRecipes, recipes);
				} catch (err) {
					setError(err.message);
					console.error("Failed to fetch recipes:", err);
				} finally {
					setLoading(false);
				}
			}
		};

		fetchRecipes();
	}, [selectedIngredient]);


	if (selectedIngredient.length === 0) {
		return (
			<div className="min-h-screen bg-gray-200 p-6">
				<div className="max-w-4xl mx-auto">
					<div className="text-center py-12">
						<h1 className="text-4xl font-bold text-gray-800 mb-4">
							Welcome to Best Recipe App
						</h1>
						<p className="text-lg text-gray-600 mb-8">
							Select ingredients you have in your fridge to
							discover delicious recipes you can make 🤌
						</p>
						<div className="bg-gray-50 p-6 rounded-lg shadow-md max-w-md mx-auto">
							<h3 className="text-lg font-semibold text-gray-700 mb-3">
								You have not selected any ingredient Bbg 🥰.
								Start by selecting some:
							</h3>
							<button
								onClick={() => navigate("/ingredients")}
								className="mt-6 bg-gray-800 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
							>
								Select Ingredients
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (loading) {
		return (
			<div className="min-h-screen bg-gray-200 p-6">
				<div className="max-w-4xl mx-auto text-center py-12">
					<div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
					<p className="mt-2">Finding recipes you can make...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen bg-gray-200 p-6">
				<div className="max-w-4xl mx-auto text-center py-12 text-red-500">
					<p>Error loading recipes</p>
					<p className="text-sm text-gray-600">{error}</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-200 p-6">
			<div className="max-w-4xl mx-auto">
				<div className="mb-8 text-center">
					<h1 className="text-3xl font-bold text-gray-800 mb-2">
						Recipes You Can Make
					</h1>
					<p className="text-gray-600">
						Using {selectedIngredient.length} selected ingredients
					</p>
				</div>

				{matchingRecipes.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{matchingRecipes.map((recipe) => (
							<RecipeCard key={recipe._id} recipe={recipe} />
						))}
					</div>
				) : (
					<div className="bg-white p-6 rounded-lg shadow text-center">
						<h3 className="text-xl font-medium text-gray-800 mb-2">
							No recipes found with your current ingredients
						</h3>
						<p className="text-gray-600 mb-4">
							Try adding more ingredients to your selection
						</p>
						<button
							onClick={() => navigate("/ingredients")}
							className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
						>
							Add More Ingredients
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Home;
