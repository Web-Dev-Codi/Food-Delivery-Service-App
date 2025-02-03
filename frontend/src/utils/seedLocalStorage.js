// Function to generate a unique ID (simple implementation for testing)
const generateId = () => {
	return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
};

// Sample menu items to use for seeding
const sampleMenuItems = [
	{
		_id: generateId(),
		name: "Margherita Pizza",
		price: 12.99,
		description: "Classic pizza with tomato sauce, mozzarella, and basil",
		imageUrl: "https://source.unsplash.com/random?pizza",
		category: "Main Course",
		quantity: 2,
	},
	{
		_id: generateId(),
		name: "Caesar Salad",
		price: 8.99,
		description: "Fresh romaine lettuce with Caesar dressing and croutons",
		imageUrl: "https://source.unsplash.com/random?salad",
		category: "Starters",
		quantity: 1,
	},
	{
		_id: generateId(),
		name: "Chocolate Brownie",
		price: 5.99,
		description: "Rich chocolate brownie with vanilla ice cream",
		imageUrl: "https://source.unsplash.com/random?brownie",
		category: "Dessert",
		quantity: 3,
	},
];

/**
 * Seeds the localStorage with sample cart items for testing
 * @returns {Object} The seeded cart data
 */
export const seedCartToLocalStorage = () => {
	// Create a guest ID if none exists
	let guestId = localStorage.getItem("guestId");
	if (!guestId) {
		guestId = generateId();
		localStorage.setItem("guestId", guestId);
	}

	const cartData = {
		user: guestId,
		isGuestCart: true,
		items: sampleMenuItems.map((item) => ({
			menuItem: item._id,
			quantity: item.quantity,
			price: item.price,
		})),
		total: Number(
			sampleMenuItems
				.reduce((sum, item) => sum + item.price * item.quantity, 0)
				.toFixed(2)
		),
	};

	localStorage.setItem("cart", JSON.stringify(cartData));

	// Sync with backend
	syncCartWithBackend(cartData, guestId);

	console.log("Cart seeded successfully:", cartData);
	return cartData;
};

/**
 * Syncs the cart with the backend
 */
const syncCartWithBackend = async (cartData, guestId) => {
	try {
		const response = await fetch("http://localhost:8000/api/cart/sync", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-Guest-ID": guestId,
			},
			body: JSON.stringify({ items: cartData.items }),
		});

		if (!response.ok) {
			throw new Error("Failed to sync cart with backend");
		}

		console.log("Cart synced with backend successfully");
	} catch (error) {
		console.error("Error syncing cart with backend:", error);
	}
};

/**
 * Clears the cart data from localStorage
 */
export const clearLocalStorageCart = () => {
	localStorage.removeItem("cart");
	localStorage.removeItem("guestId");
	console.log("Cart and guestId cleared from localStorage");
};

// You can use these functions in the browser console:
// import { seedCartToLocalStorage, clearLocalStorageCart } from './utils/seedLocalStorage'
// seedCartToLocalStorage()  // To seed the cart
// clearLocalStorageCart()   // To clear the cart
