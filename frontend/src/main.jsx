import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CartProvider } from "./context/CartContext";
import Checkout from "./components/Checkouts.jsx";
import Menu from "./components/Menu.jsx";
import ListRestaurant from "./components/ListRestaurant";
import AddRestaurant from "./components/AddRestaurant";
import SingleRestaurant from "./components/SingleRestaurant";
import { Elements } from "@stripe/react-stripe-js"; // Import Elements from Stripe
import { loadStripe } from "@stripe/stripe-js"; // Import loadStripe from Stripe
import PaymentForm from "./components/PaymentForm";
import AddReview from "./components/AddReview";
import Home from "./components/Home";
import AddMenu from "./components/AddMenu";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Cart from "./components/Cart";
// import TestCart from "./components/TestCart";
import AddCoupons from "./components/AddCoupons.jsx";
import Dashboard from "./components/Dashboard";
import ForgotPassword from "./components/ForgotPassword.jsx";
import ResetPasswordPage from "./components/ResetPasswordPage.jsx";


const stripePromise = loadStripe(
	"pk_test_51QpRWNGOBWdkGRw0ZvcDq67gGtXySdQUxNZif5af8M7v1H12kAujDscDWXd4vcExcQXYNy5iSYreTU1CCZCpbCTU00AFm9G6td"
);

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route
				path="/"
				element={<App />}>
				<Route
					index
					element={<Home />}
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
					path="/payment"
					element={
						<Elements stripe={stripePromise}>
							<PaymentForm />
						</Elements>
					}
				/>
				<Route
					path="/dashboard"
					element={<Dashboard />}>
					<Route
						path="restaurants/add"
						element={<AddRestaurant />}
					/>
					<Route
						path="add-menu"
						element={<AddMenu />}
					/>
				</Route>
				<Route
					path="/cart"
					element={<Cart />}
				/>
        <Route path="/coupons" element={<AddCoupons/>} />
				<Route
					path="/checkout"
					element={<Checkout />}
				/>
				<Route
					path="/test-cart"
					element={<TestCart />}
				/>
				<Route
					path="/restaurants/add"
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
					path="/restaurants/:id/reviews"
					element={<AddReview />}
				/>
				<Route
					path="/forgot-password"
					element={<ForgotPassword />}
				/>
				<Route
					path="/reset-password/:token"
					element={<ResetPasswordPage />}
				/>
			</Route>
		</Route>
	)
);

createRoot(document.getElementById("root")).render(
	<CartProvider>
		<RouterProvider router={router} />
	</CartProvider>
);
