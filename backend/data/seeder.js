// Sample file for seeding the database

import { faker } from "@faker-js/faker";
import mongoose from "mongoose";
import MenuItem from "../models/menuItemSchema.js";
import Cart from "../models/cartSchema.js";
import dotenv from "dotenv";

dotenv.config();

// Connect to MongoDB
mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => console.log("MongoDB connected for seeding..."))
	.catch((err) => console.error("MongoDB connection error:", err));

// Function to generate fake menu items
const generateMenuItems = async (count = 20) => {
	const menuItems = [];
	const categories = ["Main Course", "Dessert", "Starters", "Beverages"];

	// Create a sample restaurant ID (you'll need to replace this with a real one)
	const sampleRestaurantId = new mongoose.Types.ObjectId();
	// Create a sample menu ID
	const sampleMenuId = new mongoose.Types.ObjectId();

	for (let i = 0; i < count; i++) {
		const menuItem = {
			name: faker.commerce.productName(),
			price: parseFloat(
				faker.commerce.price({ min: 1, max: 50, dec: 2 })
			),
			description: faker.commerce.productDescription(),
			category: faker.helpers.arrayElement(categories),
			imageUrl: faker.image.urlLoremFlickr({ category: "food" }),
			availability: faker.datatype.boolean(),
			restaurant: sampleRestaurantId,
			menuId: sampleMenuId,
		};
		menuItems.push(menuItem);
	}

	try {
		await MenuItem.deleteMany({});
		const createdMenuItems = await MenuItem.insertMany(menuItems);
		console.log("Menu items seeded successfully!");
		return createdMenuItems;
	} catch (error) {
		console.error("Error seeding menu items:", error);
		throw error;
	}
};

// Function to generate fake cart items
const generateCarts = async (count = 10) => {
	try {
		// First, get all menu items to reference in carts
		const menuItems = await MenuItem.find();
		if (!menuItems.length) {
			throw new Error(
				"No menu items found. Please seed menu items first."
			);
		}

		const carts = [];
		// Create a sample user ID (you'll need to replace this with real users)
		const sampleUserId = new mongoose.Types.ObjectId();

		for (let i = 0; i < count; i++) {
			// Generate 1-5 items per cart
			const numberOfItems = faker.number.int({ min: 1, max: 5 });
			const items = [];
			let total = 0;

			for (let j = 0; j < numberOfItems; j++) {
				const randomMenuItem = faker.helpers.arrayElement(menuItems);
				const quantity = faker.number.int({ min: 1, max: 5 });
				const price = Number(randomMenuItem.price.toFixed(2)); // Round price to 2 decimals

				items.push({
					menuItem: randomMenuItem._id,
					quantity: quantity,
					price: price,
				});

				total += price * quantity;
			}

			const cart = {
				user: sampleUserId,
				items: items,
				total: Number(total.toFixed(2)), // Round total to 2 decimals
				createdAt: faker.date.recent({ days: 30 }),
				updatedAt: faker.date.recent({ days: 30 }),
			};
			carts.push(cart);
		}

		await Cart.deleteMany({});
		const createdCarts = await Cart.insertMany(carts);
		console.log("Carts seeded successfully!");
		return createdCarts;
	} catch (error) {
		console.error("Error seeding carts:", error);
		throw error;
	}
};

// Main seeding function
const seedDatabase = async () => {
	try {
		const menuItems = await generateMenuItems();
		const carts = await generateCarts();
		console.log(
			`Seeded ${menuItems.length} menu items and ${carts.length} carts`
		);
	} catch (error) {
		console.error("Error seeding database:", error);
	} finally {
		mongoose.disconnect();
	}
};

// Run the seeder
seedDatabase();
