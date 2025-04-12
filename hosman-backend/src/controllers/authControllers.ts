import { Request, Response } from 'express';
import fs from "fs";
import jwt from 'jsonwebtoken';
import path from 'path';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import Session from '../models/session';
const SECRET_KEY= "112eryt33"


export const signup = async (req: Request, res: Response): Promise<void> => {
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

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ success: false, message: 'User exists with this email' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    const userResponse = {
      userId: newUser._id,
      userEmail: newUser.email,
      name: newUser.username,
    };

    const token = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET || SECRET_KEY, {
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
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error', error });
  }
};

export const checkEmailExist = async (req: Request, res: Response): Promise<void> => {
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
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ success: false, message: 'User exists with this email so login with that' });
      return;
    }

    // If email is available, send success response
    res.status(200).json({ success: true, message: 'Email is available move to sign in' });

  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error', error });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email});
    if (!user) {
      res.status(400).json({ success: false, message: 'Invalid email or password' });
      return;
    }

    // Compare the password with the hashed password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      res.status(400).json({ success: false, message: 'Invalid email or password' });
      return;
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || SECRET_KEY, { expiresIn: '1h' });

    // Fetch movies from JSON file
    const filepath = path.join(__dirname, "../../contentjson/movie.json");
    const fileData = fs.readFileSync(filepath, "utf-8");
    const movieData = JSON.parse(fileData);

    // Filter movies and series
    const movies = movieData.filter((item: any) => item.Type === "movie");
    const series = movieData.filter((item: any) => item.Type === "series");
    const anime = movieData.filter((item: any) => item.Type === "anime");


    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000,
    });

    // Respond with the success message and token
    res.status(200).json({
      success: true,
      token,
      user: { id: user._id, email: user.email , username: user.username },
      movies,
      series,
      anime,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error', error });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token =
      authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : req.cookies.authToken;

    if (!token) {
      res.status(400).json({ success: false, message: "No token provided" });
      return;
    }

    // Find the session with this token
    const session = await Session.findOne({ token });

    if (session) {
      // Mark the session as inactive, but keep the role
      await Session.updateOne(
        { _id: session._id },
        { isActive: false, logoutTime: new Date() }
      );
    }

    // Clear the auth cookie
    res.clearCookie("authToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    // Respond with success
    res.status(200).json({ success: true, message: "Logout successful", loggedOut: true });
  } catch (error: any) {
    res.status(500).json({ success: false, message: "Logout failed", error: error.message });
  }
};


export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    // Retrieve all users from the database
    const users = await User.find();

    res.status(200).json({
      success: true,
      message: 'Users retrieved successfully',
      users,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error', error });
  }
};

export const deleteuser = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.params;
  try {
    console.log(`User with email ${email} is deleting`);

    // Find and delete the user by email
    const deleteduser = await User.findOneAndDelete({ email });

    if (!deleteduser) {
      // User not found
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    // Successfully deleted user
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    // Handle unexpected errors
    res.status(500).json({ success: false, message: 'An error occurred while deleting the user', error });
  }
};

