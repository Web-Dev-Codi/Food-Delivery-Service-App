import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import HomeScreen from "./components/Homescreen";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CartProvider } from "./context/CartContext";
import Checkout from "./components/Checkouts.jsx";
import Menu from "./components/Menu.jsx";
import ListRestaurant from "./components/ListRestaurant";
import AddRestaurant from "./components/AddRestaurant";
import SingleRestaurant from "./components/SingleRestaurant";
import AddMenu from "./components/AddMenu";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Cart from "./components/Cart";
import TestCart from "./components/TestCart";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route
			path="/"
			element={<App />}>
			<Route
				index
				element={<HomeScreen />}
			/>
			<Route
				path="/menu"
				element={<Menu />}
			/>
			<Route
				path="/signup"
				element={<SignupForm />}
			/>
			<Route
				path="/login"
				element={<LoginForm />}
			/>
			<Route
				path="/cart"
				element={<Cart />}
			/>
			<Route
				path="/checkout"
				element={<Checkout />}
			/>
			<Route
				path="/test-cart"
				element={<TestCart />}
				path="/addRestaurant"
				element={<AddRestaurant />}
			/>
			<Route
				path="/restaurants"
				element={<ListRestaurant />}
			/>
			<Route
				path="/restaurants/:id"
				element={<SingleRestaurant />}
			/>
			<Route
				path="/menu"
				element={<AddMenu />}
			/>
		</Route>
	)
);

createRoot(document.getElementById("root")).render(
	<CartProvider>
		<RouterProvider router={router} />,
	</CartProvider>
);
