import React, { useState, useEffect } from "react";
import IngredientCard from "../components/IngredientCard";
import { fetchAllIngredients } from "../services/api";
import { useIngredientContext } from "../contexts/IngredientContext";

function Ingredients() {
	const [ingredients, setIngredients] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const { selectedIngredient } = useIngredientContext();

	useEffect(() => {
		const loadIngredients = async () => {
			try {
				const response = await fetchAllIngredients();
				if (response.success && Array.isArray(response.data)) {
					setIngredients(response.data);
				} else {
					throw new Error("Invalid data format from API");
				}
			} catch (err) {
				setError(err.message);
				console.error("Failed to load ingredients:", err);
			} finally {
				setLoading(false);
			}
		};
		loadIngredients();
	}, []);

	if (loading)
		return <div className="p-4 text-center">Loading ingredients...</div>;
	if (error)
		return (
			<div className="p-4 text-red-500 text-center">Error: {error}</div>
		);

	return (
		<div className="p-4">
			{selectedIngredient.length > 0 && (
				<div className="mb-4 p-3 bg-blue-50 rounded-lg">
					<h3 className="font-semibold text-blue-700">
						Selected: {selectedIngredient.length} ingredient(s)
					</h3>
					<div className="flex flex-wrap gap-2 mt-2">
						{selectedIngredient.map((ing) => (
							<span
								key={ing.id}
								className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
							>
								{ing.title}
							</span>
						))}
					</div>
				</div>
			)}

			<div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-8 gap-4">
				{ingredients.map((ingredient) => (
					<IngredientCard
						key={ingredient._id}
						ingredient={{
							id: ingredient._id,
							image: ingredient.image,
							title: ingredient.name,
						}}
					/>
				))}
			</div>
		</div>
	);
}

export default Ingredients;
