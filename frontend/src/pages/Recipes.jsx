import React from "react";
import RecipeCard from "../components/RecipeCard";

// Mock data - replace with your actual data fetching
const mockRecipes = [
	{
		id: "1",
		title: "Classic Margherita Pizza",
		image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002",
		ingredients: [
			{ id: "101", name: "Pizza dough" },
			{ id: "102", name: "Tomato sauce" },
			{ id: "103", name: "Fresh mozzarella" },
			{ id: "104", name: "Basil leaves" },
		],
		procedure:
			"1. Preheat oven to 475°F (245°C)...\n2. Roll out the dough...\n3. Add toppings...",
	},
	{
		id: "2",
		title: "Vegetable Stir Fry",
		image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
		ingredients: [
			{ id: "201", name: "Broccoli" },
			{ id: "202", name: "Bell peppers" },
			{ id: "203", name: "Carrots" },
			{ id: "204", name: "Soy sauce" },
		],
		procedure:
			"1. Chop all vegetables...\n2. Heat oil in wok...\n3. Stir fry vegetables...",
	},
];

function RecipeList() {
	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-8 text-center">My Recipes</h1>

			{/* Responsive grid layout */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{mockRecipes.map((recipe) => (
					<RecipeCard key={recipe.id} recipe={recipe} />
				))}
			</div>
		</div>
	);
}

export default RecipeList;
