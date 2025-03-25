import React from "react";
import { useNavigate } from "react-router-dom";

function RecipeCard({ recipe }) {
	const navigate = useNavigate();

	return (
		<div
			className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
			onClick={() => navigate(`/recipes/${recipe._id}`)} // Have to figure this out --> Future feature
		>
			<div className="aspect-w-4 aspect-h-3 bg-gray-100">
				<img
					src={recipe.image}
					alt={recipe.name}
					className="object-cover w-full h-full"
				/>
			</div>

			<div className="p-4">
				<h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
					{recipe.name}
				</h3>
			</div>
		</div>
	);
}

export default RecipeCard;

// UI Done -> Have to work on the navigate part maybe
// Future featur --> Search feature
