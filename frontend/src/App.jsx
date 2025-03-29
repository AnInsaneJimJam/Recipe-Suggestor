import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Ingredients from "./pages/Ingredients";
import Recipes from "./pages/Recipes";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { IngredientProvider } from "./contexts/IngredientContext";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

function App() {
	return (
		<AuthProvider>
			<IngredientProvider>
				<NavBar />
				<main className="main-content">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route
							path="/ingredients"
							element={
								<PrivateRoute>
									<Ingredients />
								</PrivateRoute>
							}
						/>
						<Route
							path="/recipes"
							element={
								<PrivateRoute>
									<Recipes />
								</PrivateRoute>
							}
						/>
					</Routes>
				</main>
			</IngredientProvider>
		</AuthProvider>
	);
}

export default App;
