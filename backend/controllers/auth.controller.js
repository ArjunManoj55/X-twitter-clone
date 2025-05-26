//importing data model
import User from "../models/user.model"
//importing bcrypt for hashing password
import bcrypt from "bcrypt"
//importing jwt function
import { generateTokenAndSetCookie } from '../lib/utils/jenerateToken.js'

//signup
export const signup = async (req,res) => {
   try {
	// Destructure user input from request body
	const { fullName, username, email, password } = req.body;

	// Validate email format using regex
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		return res.status(400).json({ error: "Invalid email format" });
	}

	// Check if a user with the same username already exists
	const existingUser = await User.findOne({ username });
	if (existingUser) {
		return res.status(400).json({ error: "Username is already taken" });
	}

	// Check if a user with the same email already exists
	const existingEmail = await User.findOne({ email });
	if (existingEmail) {
		return res.status(400).json({ error: "Email is already taken" });
	}

	// Ensure password is at least 6 characters long
	if (password.length < 6) {
		return res.status(400).json({ error: "Password must be at least 6 characters long" });
	}

	// Generate salt and hash the password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	// Create a new user instance with hashed password
	const newUser = new User({
		fullName,
		username,
		email,
		password: hashedPassword,
	});

	if (newUser) {
		// Generate JWT token and set it in the cookie for authentication
		generateTokenAndSetCookie(newUser._id, res);

		// Save the new user to the database
		await newUser.save();

		// Send back the created user's public details (excluding password)
		res.status(201).json({
			_id: newUser._id,
			fullName: newUser.fullName,
			username: newUser.username,
			email: newUser.email,
			followers: newUser.followers,
			following: newUser.following,
			profileImg: newUser.profileImg,
			coverImg: newUser.coverImg,
		});
	} else {
		// If user creation failed unexpectedly
		res.status(400).json({ error: "Invalid user data" });
	}
} catch (error) {
	// Catch and log any unexpected errors
	console.log("Error in signup controller", error.message);
	res.status(500).json({ error: "Internal Server Error" });
}

}

export const login = async (req,res) => {
    
}

export const logout = async (req,res) => {
    
}