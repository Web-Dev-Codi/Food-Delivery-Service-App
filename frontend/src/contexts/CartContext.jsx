import { createContext, useState, useEffect } from "react";

export const cartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
        setItems([]);
      }
    }
    setLoading(false);
  }, []);

  // Update localStorage whenever cart changes
  useEffect(() => {
    if (!loading) {
      localStorage.setItem("cart", JSON.stringify(items));
      calculateTotal();
    }
  }, [items, loading]);

  // Calculate total price
  const calculateTotal = () => {
    const newTotal = items.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);
    setTotal(newTotal);
  };

  // Add item to cart
  const addItem = (newItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === newItem.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prevItems, { ...newItem, quantity: 1 }];
    });
  };

  // Remove item from cart
  const removeItem = (itemId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  // Update item quantity
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  // Clear entire cart
  const clearCart = () => {
    setItems([]);
    setTotal(0);
  };

  // Check if an item exists in cart
  const isInCart = (itemId) => {
    return items.some((item) => item.id === itemId);
  };

  // Get item quantity
  const getItemQuantity = (itemId) => {
    const item = items.find((item) => item.id === itemId);
    return item ? item.quantity : 0;
  };

  const value = {
    items,
    total,
    loading,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity,
  };

  return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
};
