import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import IngredientCard from "./components/IngredientCard";

function App() {
	return (
		<>
			<NavBar />
			<IngredientCard
				ingredient={{
					url: "https://media.istockphoto.com/id/1543384026/photo/schezwan-paneer.webp?a=1&b=1&s=612x612&w=0&k=20&c=gupgKtzO02hHtinibFHGX46syhdbCP_O2AFIIQg7BYA=",
					title: "Paneer Tikka",
				}}
			></IngredientCard>
			<main className="main-content">
				{/* <Routes>
					<Route path="/" element={<Home />} />
					<Route path="/ingredients" element={<Ingredients />} />
					<Route path="/recipes" element={<Recipes />} />
				</Routes> */}
			</main>
		</>
	);
}

export default App;
