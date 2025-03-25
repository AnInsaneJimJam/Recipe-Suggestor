import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Ingredients from "./pages/Ingredients";
import Recipes from "./pages/Recipes";
import Home from "./pages/Home";
import { IngredientProvider } from "./contexts/IngredientContext";

function App() {
	return (
		<IngredientProvider>
			<NavBar />
			<main className="main-content">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/ingredients" element={<Ingredients />} />
					<Route path="/recipes" element={<Recipes />} />
				</Routes>
			</main>
		</IngredientProvider>
	);
}

export default App;
