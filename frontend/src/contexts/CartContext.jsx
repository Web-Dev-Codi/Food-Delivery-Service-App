import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const cartContext = createContext();

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
	}, [items, total]);

	// Calculate total price with optional discount
	const calculateTotal = (discount = 0) => {
		const subtotal = items.reduce((sum, item) => {
			return sum + (item.price || 0) * (item.quantity || 0);
		}, 0);
		const discountedTotal = subtotal * (1 - discount / 100);
		setTotal(Math.max(0, Number(discountedTotal.toFixed(2))));
	};

	// Add item to cart with validation
	const addItem = (newItem) => {
		if (!newItem?.id || !newItem?.price || newItem?.price < 0) {
			console.error("Invalid item data");
			return false;
		}

		try {
			setItems((prevItems) => {
				const existingItem = prevItems.find(
					(item) => item.id === newItem.id
				);

				if (existingItem) {
					return prevItems.map((item) =>
						item.id === newItem.id
							? { ...item, quantity: (item.quantity || 0) + 1 }
							: item
					);
				}

				return [...prevItems, { ...newItem, quantity: 1 }];
			});
			return true;
		} catch (error) {
			console.error("Error adding item to cart:", error);
			return false;
		}
	};

	// Update item properties
	const updateItem = (itemId, updates) => {
		if (!itemId || typeof updates !== "object") {
			console.error("Invalid update parameters");
			return false;
		}

		try {
			setItems((prevItems) =>
				prevItems.map((item) =>
					item.id === itemId
						? { ...item, ...updates, id: item.id } // Prevent id from being updated
						: item
				)
			);
			return true;
		} catch (error) {
			console.error("Error updating item:", error);
			return false;
		}
	};

	// Update item quantity with validation
	const updateQuantity = (itemId, newQuantity) => {
		if (!itemId || typeof newQuantity !== "number" || newQuantity < 0) {
			console.error("Invalid quantity update parameters");
			return false;
		}

		try {
			if (newQuantity === 0) {
				return removeItem(itemId);
			}

			setItems((prevItems) =>
				prevItems.map((item) =>
					item.id === itemId
						? { ...item, quantity: newQuantity }
						: item
				)
			);
			return true;
		} catch (error) {
			console.error("Error updating quantity:", error);
			return false;
		}
	};

	// Remove item from cart with validation
	const removeItem = (itemId) => {
		if (!itemId) {
			console.error("Invalid item ID");
			return false;
		}

		try {
			setItems((prevItems) =>
				prevItems.filter((item) => item.id !== itemId)
			);
			return true;
		} catch (error) {
			console.error("Error removing item:", error);
			return false;
		}
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
		updateItem,
		clearCart,
		isInCart,
		getItemQuantity,
		calculateTotal,
	};
	return (
		<cartContext.Provider value={value}>{children}</cartContext.Provider>
	);
};

CartProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
