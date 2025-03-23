import { FaCheck } from "react-icons/fa";

function IngredientCard({ ingredient }) {
	function onSelectClick() {
		// Handle the select button click
	}

	return (
		<div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105">
			<div className="relative">
				<img
					src={ingredient.url}
					alt={ingredient.title}
					className="w-full h-48 object-cover"
				/>
				<div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
					<button
						onClick={onSelectClick}
						className="bg-white rounded-full p-2 hover:bg-gray-200 transition-colors duration-300"
					>
						<FaCheck className="h-6 w-6 text-green-500" />
					</button>
				</div>
			</div>
			<div className="p-4">
				<h3 className="text-lg font-semibold text-gray-800">
					{ingredient.title}
				</h3>
			</div>
		</div>
	);
}

export default IngredientCard;
