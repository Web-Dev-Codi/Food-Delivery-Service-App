// Sample menu items to use for seeding
const sampleMenuItems = [
  {
    _id: "sample1",
    name: "Margherita Pizza",
    price: 12.99,
    description: "Classic pizza with tomato sauce, mozzarella, and basil",
    imageUrl: "https://source.unsplash.com/random?pizza",
    category: "Main Course",
    quantity: 2
  },
  {
    _id: "sample2",
    name: "Caesar Salad",
    price: 8.99,
    description: "Fresh romaine lettuce with Caesar dressing and croutons",
    imageUrl: "https://source.unsplash.com/random?salad",
    category: "Starters",
    quantity: 1
  },
  {
    _id: "sample3",
    name: "Chocolate Brownie",
    price: 5.99,
    description: "Rich chocolate brownie with vanilla ice cream",
    imageUrl: "https://source.unsplash.com/random?brownie",
    category: "Dessert",
    quantity: 3
  }
];

/**
 * Seeds the localStorage with sample cart items for testing
 * @returns {Object} The seeded cart data
 */
export const seedCartToLocalStorage = () => {
  // Get the current user ID from localStorage or your auth context
  const userId = localStorage.getItem('userId'); // Make sure this matches how you store the user ID
  
  if (!userId) {
    console.error('User must be logged in to create a cart');
    return null;
  }

  const cartData = {
    user: userId,
    items: sampleMenuItems.map(item => ({
      menuItem: item._id, // This should be a valid MenuItem ObjectId
      quantity: item.quantity,
      price: item.price
    })),
    total: Number(
      sampleMenuItems
        .reduce((sum, item) => sum + item.price * item.quantity, 0)
        .toFixed(2)
    ),
  };

  localStorage.setItem("cart", JSON.stringify(cartData));
  console.log("Cart seeded successfully:", cartData);
  return cartData;
};

/**
 * Clears the cart data from localStorage
 */
export const clearLocalStorageCart = () => {
  localStorage.removeItem("cart");
  console.log("Cart cleared from localStorage");
};

// You can use these functions in the browser console:
// import { seedCartToLocalStorage, clearLocalStorageCart } from './utils/seedLocalStorage'
// seedCartToLocalStorage()  // To seed the cart
// clearLocalStorageCart()   // To clear the cart
