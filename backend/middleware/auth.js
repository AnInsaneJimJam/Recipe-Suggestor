import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protect = async (req, res, next) => {
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		token = req.headers.authorization.split(" ")[1];
	}

	if (!token) {
		return res.status(401).json({
			success: false,
			message: "Not authorized, no token",
		});
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		req.user = await User.findByPk(decoded.id, {
			attributes: { exclude: ["password"] }, // Don't return password
		});

		next();
	} catch (error) {
        console.log("Error in verifying token:" , message)
		res.status(401).json({
			success: false,
			message: "Not authorized, token failed",
		});
	}
};
