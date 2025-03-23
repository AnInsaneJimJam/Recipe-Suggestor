function IngredientCard({ ingredient }) {
	return (
		<div className="ingredient-card">
			<div className="ingredient-poster">
				<img
					src={ingredient.url}
					alt={ingredient.title}
				/>
				<div className="movie-overlay">
					<button
						className={`favorite-btn ${favorite ? "active" : ""}`}
						onClick={onFavoriteClick}
					>
						♥
					</button>
				</div>
			</div>
			<div className="movie-info">
				<h3>{ingredient.title}</h3>
			</div>
		</div>
	);
}

export default IngredientCard;
