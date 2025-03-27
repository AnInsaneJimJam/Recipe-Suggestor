import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Ingredient from "./ingredient.model.js";

const Recipe = sequelize.define("Recipe", {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notEmpty: true,
		},
	},
	procedure: {
		type: DataTypes.TEXT,
		allowNull: false,
		validate: {
			notEmpty: true,
		},
	},
	image: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notEmpty: true,
		},
	},
});

// Many-to-Many relationship with Ingredients
Recipe.belongsToMany(Ingredient, {
	through: "recipe_ingredients",
	foreignKey: "recipe_id",
	otherKey: "ingredient_id",
});
Ingredient.belongsToMany(Recipe, {
	through: "recipe_ingredients",
	foreignKey: "ingredient_id",
	otherKey: "recipe_id",
});

export default Recipe;
