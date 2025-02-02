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
import Menu from "./components/Menu.jsx";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Cart from "./components/Cart";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route
			path="/"
			element={<App />}>
			<Route
				index={true}
				path="/"
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
		</Route>
	)
);

createRoot(document.getElementById("root")).render(
	<CartProvider>
		<RouterProvider router={router} />,
	</CartProvider>
);
