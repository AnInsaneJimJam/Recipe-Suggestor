import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Ingredient = sequelize.define("Ingredient", {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
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

export default Ingredient;
