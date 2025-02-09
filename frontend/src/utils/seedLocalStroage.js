// Function to generate a MongoDB-like ObjectId
const generateObjectId = () => {
  const timestamp = Math.floor(Date.now() / 1000).toString(16).padStart(8, '0');
  const randomPart = Math.random().toString(16).slice(2, 14).padStart(12, '0');
  const counter = Math.floor(Math.random() * 16777215).toString(16).padStart(4, '0');
  return timestamp + randomPart + counter;
};

// Sample menu items to use for seeding with fixed ObjectIds
const sampleMenuItems = [
  {
    _id: "65c37a1f8e88d4e234567801", // Fixed ObjectId for Samosa
    name: "Samosa",
    quantity: 2,
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
    quantity: 2,
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
    quantity: 3,
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
    guestId = generateObjectId();
    localStorage.setItem("guestId", guestId);
  }

  const cartData = {
    user: guestId,
    isGuestCart: true,
    items: sampleMenuItems.map((item) => ({
      menuItem: item._id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      description: item.description,
      imageUrl: item.imageUrl,
    })),
    total: Number(
      sampleMenuItems
        .reduce((sum, item) => sum + item.price * item.quantity, 0)
        .toFixed(2),
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
