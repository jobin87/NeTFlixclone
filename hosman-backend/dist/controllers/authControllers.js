"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteuser = exports.getAllUsers = exports.logout = exports.login = exports.checkEmailExist = exports.signup = void 0;
const fs_1 = __importDefault(require("fs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const path_1 = __importDefault(require("path"));
const user_1 = __importDefault(require("../models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const session_1 = __importDefault(require("../models/session"));
const SECRET_KEY = "112eryt33";
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        // Validate fields
        if (!username || !email || !password) {
            res.status(400).json({ success: false, message: 'All fields are required' });
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            res.status(400).json({ success: false, message: 'Invalid email format' });
            return;
        }
        if (password.length < 6) {
            res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
            return;
        }
        const existingUser = yield user_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({ success: false, message: 'User exists with this email' });
            return;
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = new user_1.default({ username, email, password: hashedPassword });
        yield newUser.save();
        const userResponse = {
            userId: newUser._id,
            userEmail: newUser.email,
            name: newUser.username,
        };
        const token = jsonwebtoken_1.default.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET || SECRET_KEY, {
            expiresIn: '1h',
        });
        // ✅ Set cookie first, then respond
        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'strict',
            maxAge: 60 * 60 * 1000, // 1 hour
        });
        res.status(200).json({
            success: true,
            message: 'Signup successful',
            token,
            userResponse,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error', error });
    }
});
exports.signup = signup;
const checkEmailExist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        // Check if email fields are provided
        if (!email) {
            res.status(400).json({ success: false, message: 'Email field is empty' });
            return;
        }
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            res.status(400).json({ success: false, message: 'Invalid email format' });
            return;
        }
        // Check if the email already exists
        const existingUser = yield user_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({ success: false, message: 'User exists with this email so login with that' });
            return;
        }
        // If email is available, send success response
        res.status(200).json({ success: true, message: 'Email is available move to sign in' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error', error });
    }
});
exports.checkEmailExist = checkEmailExist;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Find the user by email
        const user = yield user_1.default.findOne({ email });
        if (!user) {
            res.status(400).json({ success: false, message: 'Invalid email or password' });
            return;
        }
        // Compare the password with the hashed password
        const isPasswordCorrect = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordCorrect) {
            res.status(400).json({ success: false, message: 'Invalid email or password' });
            return;
        }
        // Generate a JWT token
        const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || SECRET_KEY, { expiresIn: '1h' });
        // Fetch movies from JSON file
        const filepath = path_1.default.join(__dirname, "../../contentjson/movie.json");
        const fileData = fs_1.default.readFileSync(filepath, "utf-8");
        const movieData = JSON.parse(fileData);
        // Filter movies and series
        const movies = movieData.filter((item) => item.Type === "movie");
        const series = movieData.filter((item) => item.Type === "series");
        const anime = movieData.filter((item) => item.Type === "anime");
        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 1000,
        });
        // Respond with the success message and token
        res.status(200).json({
            success: true,
            token,
            user: { id: user._id, email: user.email, username: user.username },
            movies,
            series,
            anime,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error', error });
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : req.cookies.authToken;
        if (!token) {
            res.status(400).json({ success: false, message: "No token provided" });
            return;
        }
        // Find the session with this token
        const session = yield session_1.default.findOne({ token });
        if (session) {
            // Mark the session as inactive, but keep the role
            yield session_1.default.updateOne({ _id: session._id }, { isActive: false, logoutTime: new Date() });
        }
        // Clear the auth cookie
        res.clearCookie("authToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        // Respond with success
        res.status(200).json({ success: true, message: "Logout successful", loggedOut: true });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Logout failed", error: error.message });
    }
});
exports.logout = logout;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Retrieve all users from the database
        const users = yield user_1.default.find();
        res.status(200).json({
            success: true,
            message: 'Users retrieved successfully',
            users,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error', error });
    }
});
exports.getAllUsers = getAllUsers;
const deleteuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    try {
        console.log(`User with email ${email} is deleting`);
        // Find and delete the user by email
        const deleteduser = yield user_1.default.findOneAndDelete({ email });
        if (!deleteduser) {
            // User not found
            res.status(404).json({ success: false, message: 'User not found' });
            return;
        }
        // Successfully deleted user
        res.status(200).json({ success: true, message: 'User deleted successfully' });
    }
    catch (error) {
        // Handle unexpected errors
        res.status(500).json({ success: false, message: 'An error occurred while deleting the user', error });
    }
});
exports.deleteuser = deleteuser;
