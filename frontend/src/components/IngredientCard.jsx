import React, { useState } from "react";

//commenting full code again because I am loosing my sanity

function IngredientCard({ ingredient }) {
	// false state initially
	const [isSelected, setIsSelected] = useState(false);

	const handleSelectClick = () => {
		setIsSelected(!isSelected); // f-->t, t-->f
	};

	return (
		<div
			className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-lg ${
				isSelected ? "bg-blue-50 border-2 border-blue-500" : ""
			}`}
			onClick={handleSelectClick}
		>
			<div className="relative">
				<img
					src={ingredient.url}
					alt={ingredient.title}
					className="w-full h-16 object-cover"
				/>

				{/* Shortcircuiting, svg taken from internet */}
				{isSelected && (
					<div className="absolute top-2 right-2 bg-white rounded-full p-1">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6 text-blue-500"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M5 13l4 4L19 7"
							/>
						</svg>
					</div>
				)}
			</div>
			<div className="p-4">
				<h3 className="text-sm font-semibold text-gray-800">
					{ingredient.title}
				</h3>
			</div>
		</div>
	);
}

export default IngredientCard;

// Perfect Design, Have to handle selected logic to global state.
