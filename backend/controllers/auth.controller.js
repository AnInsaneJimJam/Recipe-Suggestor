import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import dotenv from "dotenv";

dotenv.config();

const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET);
};

export const register = async (req, res) => {
	try {
		const { username, password } = req.body;

		const userExists = await User.findOne({ where: { username } });
		if (userExists) {
			return res
				.status(400)
				.json({ success: false, message: "Username already exists" });
		}

		const user = await User.create({ username, password });

		res.status(201).json({
			success: true,
			data: {
				id: user.id,
				username: user.username,
				token: generateToken(user.id),
			},
		});
	} catch (error) {
        console.log("Error in Creating User:", error.message)

		res.status(500).json({
			success: false,
			message: "Server error:" 
		});
	}
};

export const login = async (req, res) => {
	try {
		const { username, password } = req.body;

		const user = await User.findOne({ where: { username } });
		if (!user) {
			return res.status(401).json({
				success: false,
				message: "Invalid credentials",
			});
		}

		const isMatch = await user.matchPassword(password);
		if (!isMatch) {
			return res.status(401).json({
				success: false,
				message: "Invalid credentials",
			});
		}

		res.json({
			success: true,
			data: {
				id: user.id,
				username: user.username,
				token: generateToken(user.id),
			},
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Server error",
			error: error.message,
		});
	}
};

export const getMe = async (req, res) => {
	try {
		const user = await User.findByPk(req.user.id, {
			attributes: ["id", "username"], // Don't return password
		});

		res.json({
			success: true,
			data: user,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Server error",
			error: error.message,
		});
	}
};
