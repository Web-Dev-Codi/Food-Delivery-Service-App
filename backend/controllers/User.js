import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";

export const createUsers = async (req, res) => {
  try {
    const { name, email, password, role, contact, address } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email, and password are required.",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message:
          "User with this email already exists.please login as you are already a registered user",
      });
    }
    // Create the user
    const user = await User.create({
      name,
      email,
      password,
      role,
      contact,
      address,
    });

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    // Respond with success
    res.status(201).json({
      message: "User signed successfully",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: token,
    });
  } catch (err) {
    // Catch any other errors
    res.status(500).json({
      message: "An error occurred while signing in .",
      error: err.message,
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required.",
    });
  }

  try {
    const validateUser = await User.findOne({ email });
    if (!validateUser) {
      return res.status(404).json({
        message: "User not found . Please sign up to use our services",
      });
    }
    const validPassword = await validateUser.comparePassword(password);
    if (!validPassword) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }
    const token = jwt.sign(
      { userId: validateUser._id, email: validateUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });

    return res.status(200).json({
      message: "Login successful",
      data: {
        _id: validateUser._id,
        name: validateUser.name,
        email: validateUser.email,
        role: validateUser.role,
      },
      token: token,
    });
  } catch (err) {
    res.status(500).json({
      message:
        "You are not a registered user please sign up to use our services",
      error: err.message,
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).json({
        message: "No users found",
      });
    }
    res.status(200).json({
      message: "All users fetched successfully",
      data: users,
    });
  } catch (err) {
    res.status(500).json({
      message: "An error occurred while fetching users",
      error: err.message,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      message: "User fetched successfully",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      message: "An error occurred while fetching user",
      error: err.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      message: "An error occurred while updating user",
      error: err.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (err) {
    res.status(500).json({
      message: "An error occurred while deleting user",
      error: err.message,
    });
  }
};

export const signOut = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      message: "Sign out successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "An error occurred while signing out",
      error: err.message,
    });
  }
};
