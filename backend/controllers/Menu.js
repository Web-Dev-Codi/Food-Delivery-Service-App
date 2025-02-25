import FoodItem from "../models/FoodItem.js";
import { ObjectId } from "mongodb";
import menuItems from "../data/seeder1.js";

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
		res.status(200).json({
			message: "Data seeded successfully",
			data: data,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

 export const getMenuByName = async (req, res) => {
    try {
        const { name } = req.params; // Get name from URL parameters
        if (!name) {
            return res.status(400).json({ message: "Menu name is required" });
        }

        // Find the menu item by name (case insensitive)
        const menu = await FoodItem.findOne({ name: { $regex: new RegExp(`^${name}$`, "i") } });

        if (!menu) {
            return res.status(404).json({ message: "Menu not found" });
        }

        res.status(200).json({ success: true, data: menu });
    } catch (error) {
        console.error("Error fetching menu:", error);
        res.status(500).json({ message: "Server error" });
    }
};


 export const updateMenuByName = async (req, res) => {
	try {
	  const { name } = req.params; // Get menu name from URL
	  const updatedData = req.body; // Get updated menu data from request body
  
	  // Find the menu item by name and update it
	  const updatedMenu = await FoodItem.findOneAndUpdate(
		{ name: { $regex: new RegExp(`^${name}$`, "i") } }, // Case-insensitive search
		{ $set: updatedData }, // Data to update
		{ new: true, runValidators: true } // Return updated document & validate
	  );
  
	  if (!updatedMenu) {
		return res.status(404).json({ success: false, message: "Menu not found" });
	  }
  
	  res.status(200).json({ success: true, data: updatedMenu, message: "Menu updated successfully" });
	} catch (error) {
	  console.error("Error updating menu:", error);
	  res.status(500).json({ success: false, message: "Internal Server Error" });
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

		// Define allowed categories
		const allowedCategories = ["Main Course", "Dessert", "Starters", "Beverages"];

		// Normalize input (capitalize first letter)
		const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

		// Validate category
		if (!allowedCategories.includes(formattedCategory)) {
			return res.status(400).json({ message: "Invalid category" });
		}

		// Directly query MongoDB with the formatted category
		const menus = await FoodItem.find({ category: formattedCategory });

		if (menus.length === 0) {
			return res.status(404).json({ message: "No food items found in this category" });
		}

		res.status(200).json({ message: "Food items found", data: menus });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getMenuById = async (req, res) => {
	try {
		const id = req.params.id;
		console.log(id);
		if(!id) {
			
			return res.status(400).json({ message: "ID is required" });
		}
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
			short_desc,
			description,
			price,
			category,
			imageUrl,
			availability,
			restaurant,
			ratings,
		} = req.body;

		// Validate required fields
		if (
			!name ||
			!short_desc || 
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
			short_desc,
			description,
			price,
			category,
			imageUrl,
			availability,
			restaurant,
			ratings: ratings || 0,
		});

		res.status(201).json({
			message: "Menu added successfully",
			data: newMenu,
		});
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
		res.status(200).json({
			message: "Menu updated successfully",
			data: updatedMenu,
		});
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
		res.status(200).json({
			message: "Menu deleted successfully",
			data: deletedMenu,
		});
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
