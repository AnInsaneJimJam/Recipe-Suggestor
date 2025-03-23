import { Link } from "react-router-dom";

function NavBar() {
	return (
		<nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
			<div className="navbar-brand">
				<Link to="/" className="text-xl font-bold hover:text-gray-300">
					Recipe Suggester
				</Link>
			</div>
			<div className="flex space-x-4">
				<Link to="/ingredients" className="hover:text-gray-300">
					Select Ingredients
				</Link>
				<Link to="/recipes" className="hover:text-gray-300">
					Create Recipes
				</Link>
			</div>
		</nav>
	);
}

export default NavBar;
