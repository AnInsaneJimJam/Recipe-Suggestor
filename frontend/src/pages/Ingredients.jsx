import React from "react";
import IngredientCard from "../components/IngredientCard";


function Ingredients() {
	const ingredients = [
		{ id: 1, url: "abc", title: "Paneer " },
		{ id: 2, url: "def", title: "Butter " },
		{ id: 3, url: "ghi", title: "Chicken " },
		{ id: 4, url: "jkl", title: "Palak " },
		{ id: 5, url: "mno", title: "Dal " },
		{ id: 6, url: "pqr", title: "Roti" },
	];

	return (
		<div className="p-4">
			<div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-8 gap-6">
				{ingredients.map((ingredient) => (
					<IngredientCard
						ingredient={ingredient}
						key={ingredient.id}
					/>
				))}
			</div>
		</div>
	);
}

export default Ingredients;
