import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(process.env.POSTGRES_DB, "postgres", "1234", {
	host: process.env.POSTGRES_HOST || "localhost",
	dialect: "postgres",
	logging: false,
	port: process.env.POSTGRES_PORT || 5432,
	define: {
		timestamps: true,
		underscored: true,
		createdAt: "created_at",
		updatedAt: "updated_at",
	},
});

export const connectDB = async () => {
	try {
		await sequelize.authenticate();
		console.log("PostgreSQL Connected successfully.");

		await sequelize.sync({ alter: true });
		console.log("All models were synchronized successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
		process.exit(1);
	}
};

export default sequelize;
