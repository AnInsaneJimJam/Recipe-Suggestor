import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import IngredientCard from "./components/IngredientCard";
import Ingredients from "./pages/Ingredients";

function App() {
	return (
		<>
			<NavBar />
			<main className="main-content">
				<Routes>
					{/* <Route path="/" element={<Home />} /> */}
					<Route path="/ingredients" element={<Ingredients />} />
					{/* <Route path="/recipes" element={<Recipes />} /> */}
				</Routes>
			</main>
		</>
	);
}

export default App;
