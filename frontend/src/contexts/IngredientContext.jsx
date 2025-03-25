import { createContext, useState, useContext, useEffect } from "react";

const IngredientContext = createContext();

export const useIngredientContext = () => useContext(IngredientContext);

export const IngredientProvider = ({ children }) => {
	const [selectedIngredient, setSelectedIngredient] = useState(() => {
		const storedSelection = localStorage.getItem("selectedIngredients");
		return storedSelection ? JSON.parse(storedSelection) : [];
	});

	useEffect(() => {
		localStorage.setItem(
			"selectedIngredients",
			JSON.stringify(selectedIngredient)
		);
	}, [selectedIngredient]);

	const addToSelected = (ingridient) => {
		setSelectedIngredient((prev) => [...prev, ingridient]);
	};

	const removeFromSelected = (ingredientId) => {
		setSelectedIngredient((prev) =>
			prev.filter((ingredient) => ingredient.id !== ingredientId)
		);
	};

	const isSelected = (ingredientId) => {
		return selectedIngredient.some(
			(ingredient) => ingredient.id === ingredientId
		);
	};

	const value = {
		selectedIngredient,
		addToSelected,
		removeFromSelected,
		isSelected,
	};

	return (
		<IngredientContext.Provider value={value}>
			{children}
		</IngredientContext.Provider>
	);
};
