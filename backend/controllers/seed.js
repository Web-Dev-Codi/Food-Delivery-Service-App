import mongoose from "mongoose";
// import FoodItem from "../models/menuSchema.js";
import menuItems from "../data/seeder1.js";
import FoodItem from "../models/FoodItem.js";





export const seedData = async (req, res) => {
    try {
        // Delete any existing food items in the collection before inserting new ones
        await FoodItem.deleteMany({});

        // Modify the menuItems to convert 'restaurant' field to ObjectId
        const modifiedMenuItems = menuItems.map(item => ({
            ...item,
            restaurant: new mongoose.Types.ObjectId(item.restaurant)
        }));

        // Insert the modified menu items
        await FoodItem.insertMany(modifiedMenuItems);

        // Fetch all the inserted data
        const insertedData = await FoodItem.find({});

        // Return the inserted data as a response
        res.status(200).json({ message: "Data seeded successfully", data: insertedData });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

