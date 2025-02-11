// Function to generate a MongoDB-like ObjectId
function generateMongoObjectId() {
	const timestamp = Math.floor(new Date().getTime() / 1000)
		.toString(16)
		.padStart(8, "0");
	const randomBytes = Array.from({ length: 16 }, () =>
		Math.floor(Math.random() * 256)
			.toString(16)
			.padStart(2, "0")
	)
		.join("")
		.substring(0, 16);

	return timestamp + randomBytes;
}

// Sample menu items to use for seeding with fixed ObjectIds
const sampleMenuItems = [
	{
		_id: "65c37a1f8e88d4e234567801", // Fixed ObjectId for Samosa
		name: "Samosa",
		price: 5,
		description: "Crispy fried pastry with spicy potato filling",
		category: "Starters",
		imageUrl:
			"https://res.cloudinary.com/difmxsysx/image/upload/v1738584143/samosa_yyuhnl.webp",
		availability: "Available",
		restaurant: "67a08c18a817ad598a39bd54",
	},
	{
		_id: "65c37a1f8e88d4e234567802", // Fixed ObjectId for Butter Chicken
		name: "Butter Chicken",
		price: 15,
		description: "Creamy tomato-based chicken curry",
		category: "Main Course",
		imageUrl:
			"https://res.cloudinary.com/difmxsysx/image/upload/v1738584143/butter-chicken_tsnbga.jpg",
		availability: "Available",
		restaurant: "67a08c18a817ad598a39bd54",
	},
	{
		_id: "65c37a1f8e88d4e234567803", // Fixed ObjectId for Gulab Jamun
		name: "Gulab Jamun",
		price: 7,
		description: "Deep-fried dumplings soaked in sugar syrup",
		category: "Dessert",
		imageUrl:
			"https://res.cloudinary.com/difmxsysx/image/upload/v1738584143/Gulab-Jamun_ry0uvd.jpg",
		availability: "Available",
		restaurant: "67a08c18a817ad598a39bd54",
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
		guestId = generateMongoObjectId();
		localStorage.setItem("guestId", guestId);
	}

	const cartData = {
		guestId: guestId,
		isGuestCart: true,
		items: sampleMenuItems.map((item, index) => ({
			menuItem: {
				_id: item._id,
				name: item.name,
				price: item.price,
				description: item.description,
				imageUrl: item.imageUrl,
				availability: item.availability,
				restaurant: item.restaurant,
			},
			quantity: 
		})),
		total: Number(
			sampleMenuItems
				.reduce(
					(sum, item, index) => {
						const quantity = index === 0 ? 2 : index === 1 ? 2 : 3;
						return sum + item.price * quantity;
					},
					0
				)
				.toFixed(2)
		),
	};

	localStorage.setItem("cart", JSON.stringify(cartData));

	console.log("Cart seeded successfully:", cartData);
	return cartData;
};

/**
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
