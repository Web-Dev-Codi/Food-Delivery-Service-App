// Function to generate a unique ID (simple implementation for testing)
const generateId = () => {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
};

// Sample menu items to use for seeding
const sampleMenuItems = [
  {
    _id: generateId(),
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
    _id: generateId(),
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
    _id: generateId(),
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
    guestId = generateId();
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
