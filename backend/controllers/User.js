import User from "../models/userSchema.js";

export const createUsers = async (req, res) => {
  try {
    const { name, email, password, role, contact, address } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email, and password are required.",
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

    // Respond with success
    res.status(201).json({
      message: "User created successfully",
      data: user,
    });
  } catch (err) {
    // Catch any other errors
    res.status(500).json({
      message: "An error occurred while creating the user.",
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
        message: "User not found",
      });
    }
    const validPassword = await validateUser.comparePassword(password);
    if (!validPassword) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    return res.status(200).json({
      message: "Login successful",
      data: validateUser,
    });
  } catch (err) {
    res.status(500).json({
      message: "you are not a registered user please sign up to use our services",
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
      data: users
    });
  }
  catch (err) {
    res.status(500).json({
      message: "An error occurred while fetching users",
      error: err.message
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
      data: user
    });
  }
  catch (err) {
    res.status(500).json({
      message: "An error occurred while fetching user",
      error: err.message
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      message: "User updated successfully", data: updatedUser
    });
  }
  catch (err) {
    res.status(500).json({
      message: "An error occurred while updating user",
      error: err.message
    });
  }
}

export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found",

      });
    }
    res.status(200).json({
      message: "User deleted successfully", data: deletedUser
    });
  }
  catch (err) {
    res.status(500).json({
      message: "An error occurred while deleting user",
      error: err.message
    });
  }
}







