import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

function NavBar() {
	const { user, logout } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	return (
		<nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
			<div className="flex items-center space-x-4">
				<Link
					to="/"
					className="text-2xl font-bold hover:text-gray-300 italic"
				>
					Recipe Suggester
				</Link>
			</div>

			<div className="flex items-center space-x-6">
				{user ? (
					<>
						<Link to="/ingredients" className="hover:text-gray-300">
							Select Ingredients
						</Link>
						<Link to="/recipes" className="hover:text-gray-300">
							View Recipes
						</Link>
						<button
							onClick={handleLogout}
							className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition"
						>
							Logout
						</button>
					</>
				) : (
					<>
						<Link
							to="/login"
							className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
						>
							Login
						</Link>
						<Link
							to="/register"
							className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 transition"
						>
							Register
						</Link>
					</>
				)}
			</div>
		</nav>
	);
}

export default NavBar;
