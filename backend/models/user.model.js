import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import bcrypt from "bcryptjs";

const User = sequelize.define(
	"User",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				notEmpty: true,
			},
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
	},
	{
		timestamps: true,
		underscored: true,
		hooks: {
			beforeCreate: async (user) => {
				const salt = await bcrypt.genSalt(10);
                // Storing hashed passwords
				user.password = await bcrypt.hash(user.password, salt);
			},
		},
	}
);

// Method to compare passwords
User.prototype.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

export default User;
