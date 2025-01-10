import { redis } from "../lib/redis.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const generateTokens = (userId) => {
	const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: "15m",
	});

	const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: "7d",
	});

	return { accessToken, refreshToken };
};

const storeRefreshToken = async (userId, refreshToken) => {
	await redis.set(`refresh_token:${userId}`, refreshToken, "EX", 7 * 24 * 60 * 60); // 7days
};

const setCookies = (res, accessToken, refreshToken) => {
	res.cookie("accessToken", accessToken, {
		httpOnly: true, // prevent XSS attacks, cross site scripting attack
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict", // prevents CSRF attack, cross-site request forgery attack
		maxAge: 15 * 60 * 1000, // 15 minutes
	});
	res.cookie("refreshToken", refreshToken, {
		httpOnly: true, // prevent XSS attacks, cross site scripting attack
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict", // prevents CSRF attack, cross-site request forgery attack
		maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
	});
};

export const signup = async (req, res) => {
	const { email, password, name } = req.body;
	try {
		const userExists = await User.findOne({ email });

		if (userExists) {
			return res.status(400).json({ message: "User already exists" });
		}
		const user = await User.create({ name, email, password });

		// authenticate
		const { accessToken, refreshToken } = generateTokens(user._id);
		await storeRefreshToken(user._id, refreshToken);

		setCookies(res, accessToken, refreshToken);

		const leanUser = user.toObject();
		delete leanUser.password;
		res.json(leanUser);
	} catch (error) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({ message: error.message });
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		console.log(email, password);
		const user = await User.findOne({ email });

		if (user && (await user.comparePassword(password))) {
			const { accessToken, refreshToken } = generateTokens(user._id);
			await storeRefreshToken(user._id, refreshToken);
			setCookies(res, accessToken, refreshToken);
			const leanUser = user.toObject();
			delete leanUser.password;
			res.json(leanUser);
		} else {
			res.status(400).json({ message: "Invalid email or password" });
		}
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ message: error.message });
	}
};

export const logout = async (req, res) => {
	try {
		const refreshToken = req.cookies.refreshToken;
		if (refreshToken) {
			const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
			await redis.del(`refresh_token:${decoded.userId}`);
		}

		res.clearCookie("accessToken");
		res.clearCookie("refreshToken");
		res.json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

// this will refresh the access token
export const refreshToken = async (req, res) => {
	try {
		const refreshToken = req.cookies.refreshToken;

		if (!refreshToken) {
			return res.status(401).json({ message: "No refresh token provided" });
		}

		const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
		const storedToken = await redis.get(`refresh_token:${decoded.userId}`);

		if (storedToken !== refreshToken) {
			return res.status(401).json({ message: "Invalid refresh token" });
		}

		const accessToken = jwt.sign({ userId: decoded.userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });

		res.cookie("accessToken", accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 15 * 60 * 1000,
		});

		res.json({ message: "Token refreshed successfully" });
	} catch (error) {
		console.log("Error in refreshToken controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getProfile = async (req, res) => {
	try {
		res.json(req.user);
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};


export const updateProfile = async (req, res) => {
	const { name, countryCode, phone } = req.body;
	try {
		const userId = req.user._id;
		const updateData = {
			name,
			number: { countryCode, value: phone }
		};
		const updatedUser = await User.findByIdAndUpdate(
			userId,
			updateData,
			{
				new: true,
				runValidators: true,
			}
		);
		if (!updatedUser) {
			return res.status(404).json({ message: "User not found" });
		}
		res.status(200).json(updatedUser);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error updating profile", error: error.message });
	}
}

export const updateAddress = async (req, res) => {
	const { address, city, state, pincode, landmark } = req.body;
	try {
		const userId = req.user._id;
		const updateData = {
			address,
			city,
			state,
			pincode
		};
		if (landmark) {
			updateData.landmark = landmark;
		}
		const updatedUser = await User.findByIdAndUpdate(
			userId,
			{ address: updateData },
			{
				new: true,
				runValidators: true,
			}
		);
		if (!updatedUser) {
			return res.status(404).json({ message: "User not found" });
		}
		res.status(200).json(updatedUser);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error updating address", error: error.message });
	}
}

export const updatePassword = async (req, res) => {
	try {
		const { currentPassword, newPassword, confirmPassword } = req.body;
		const user = req.user;
		const mongoDBUser = await User.findById(user._id);
		if (!user) {
			return res.status(401).json({ message: "Unauthorized" });
		}
		if (!mongoDBUser) {
			return res.status(404).json({ message: "User not found" });
		}
		if (newPassword !== confirmPassword) {
			return res.status(400).json({ message: "Passwords do not match" });
		}
		if (await mongoDBUser.comparePassword(currentPassword)) {
			mongoDBUser.password = newPassword;
			await mongoDBUser.save();
			res.status(200).json({ message: "Password updated successfully" });
		}
	} catch (error) {
		console.error("Error in updatePassword controller", error.message);
		res.status(500).json({ message: "Error updating password", error: error.message });
	}
}