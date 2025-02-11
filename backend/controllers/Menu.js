import FoodItem from "../models/FoodItem.js";
import { ObjectId } from "mongodb";
import menuItems from "../data/seeder.js";

export const getMenus = async (req, res) => {
  try {
    const foodItems = await FoodItem.find();
    if (foodItems.length === 0) {
      return res.status(404).json({ message: "No food items found" });
    }
    res.status(200).json({ message: "Food items found", data: foodItems });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const seedData = async (req, res) => {
  try {
    await FoodItem.deleteMany({});
    const data = await FoodItem.insertMany(menuItems);
    res.status(200).json({ message: "Data seeded successfully", data: data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMenusByRestaurant = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the ID (if it's a MongoDB ObjectId)
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid restaurant ID" });
    }

    const menus = await FoodItem.find({ restaurant: id });

    if (menus.length === 0) {
      return res
        .status(404)
        .json({ message: "No food items found for this restaurant" });
    }

    res.status(200).json({ message: "Food items found", data: menus });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: error.message });
  }
};

export const getMenusByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const menus = await FoodItem.find({ category: category });
    if (menus.length === 0) {
      return res.status(404).json({ message: "No food items found" });
    }
    res.status(200).json({ message: "Food items found", data: menus });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMenuById = async (req, res) => {
  try {
    const id = req.params.id;
    const menu = await FoodItem.findById(id);
    if (!menu) {
      return res.status(404).json({ message: "No food item found" });
    }
    res.status(200).json({ message: "Food item found", data: menu });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addMenu = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      imageUrl,
      availability,
      restaurant,
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !imageUrl ||
      !availability ||
      !restaurant
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (!imageUrl.startsWith("https://res.cloudinary.com/")) {
      return res.status(400).json({
        message: "All image URLs must be from Cloudinary.",
      });
    }

    // Create and save the menu item
    const newMenu = await FoodItem.create({
      name,
      description,
      price,
      category,
      imageUrl,
      availability,
      restaurant,
    });

    res.status(201).json({ message: "Menu added successfully", data: newMenu });
  } catch (error) {
    console.error("Error adding menu:", error);
    res.status(500).json({ message: error.message });
  }
};

export const updateMenu = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedMenu = await FoodItem.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedMenu) {
      res.status(404).json({ message: "No food item found" });
    }
    res
      .status(200)
      .json({ message: "Menu updated successfully", data: updatedMenu });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteMenu = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedMenu = await FoodItem.findByIdAndDelete(id);
    if (!deletedMenu) {
      res.status(404).json({ message: "No food item found" });
    }
    res
      .status(200)
      .json({ message: "Menu deleted successfully", data: deletedMenu });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
