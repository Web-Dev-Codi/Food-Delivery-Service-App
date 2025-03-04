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
import AddCoupons from "./components/AddCoupons.jsx";
import Dashboard from "./components/Dashboard";
import ForgotPassword from "./components/ForgotPassword.jsx";
import ResetPasswordPage from "./components/ResetPasswordPage.jsx";
import PageNotFound from "./components/PageNotFound.jsx";
import SingleMenu from "./components/SingleMenu.jsx";
import UserProfile from "./components/UserProfile.jsx";
import FAQ from "./components/views/FAQ.jsx";
import Orders from "./components/Orders.jsx";
import SingleOrder from "./components/SingleOrder.jsx";
import CartCheckoutFlow from "./components/cartFlow/modified_cartFlow.jsx";
import Invoice from "./components/Invoice-new.jsx";
import UpdateMenuForm from "./components/UpdateMenu.jsx";
import DeleteMenu from "./components/DeleteMenu.jsx";
// import CheckoutForm from "./components/CheckoutForm.jsx";
import AboutUs from "./components/AboutUs.jsx";
import UpdateRestaurantForm from "./components/UpdateRestaurant.jsx";


const stripePromise = loadStripe(
	"pk_test_51QpRWNGOBWdkGRw0ZvcDq67gGtXySdQUxNZif5af8M7v1H12kAujDscDWXd4vcExcQXYNy5iSYreTU1CCZCpbCTU00AFm9G6td"
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/payment"
          element={
            <Elements stripe={stripePromise}>
              <PaymentForm />
            </Elements>
          }
        />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="restaurants/add" element={<AddRestaurant />} />
          <Route path="add-menu" element={<AddMenu />} />
          <Route path="coupons" element={<AddCoupons />} />
          <Route path="orders" element={<Orders />} />
          <Route path="single-order/:id" element={<SingleOrder />} />
          {/* Double check the path or if this components is in the right place, if not move it where it needs to be */}
          <Route path="update-restaurant/:id" element={<UpdateRestaurantForm />} />
        </Route>
        <Route path="/menu/:id" element={<SingleMenu />} />
        <Route path="/restaurants" element={<ListRestaurant />} />
        <Route path="/restaurants/:id" element={<SingleRestaurant />} />
        <Route path="/restaurants/:id/reviews" element={<AddReview />} />
        <Route path="/checkout" element={<CartCheckoutFlow />} />
        <Route path="/update-menu" element={<UpdateMenuForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/faqs" element={<FAQ />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/delete-menu" element={<DeleteMenu />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
	<CartProvider>
		<RouterProvider router={router} />
	</CartProvider>
);
