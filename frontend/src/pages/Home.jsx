import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const [selectedIngredients] = useState([]); // Have to configure from global state
	const navigate = useNavigate();

	return (
		<div className="min-h-screen bg-gray-200 p-6">
			<div className="max-w-4xl mx-auto">
				{selectedIngredients.length > 0 ? (
					<div></div> // Have to implement
				) : (
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
								Start by selecting some :
							</h3>
							<button
								onClick={() => navigate("/ingredients")}
								className="mt-6 bg-gray-800 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
							>
								Select Ingredients
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Home;

// Need to work on global context
