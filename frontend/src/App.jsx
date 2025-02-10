import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListRestaurant from "./components/ListRestaurant";
import AddRestaurant from  "./components/AddRestaurant";
import SingleRestaurant from "./components/SingleRestaurant";
import AddMenu from "./components/AddMenu";
import AddReview from "./components/AddReview";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import PaymentForm from "./components/PaymentForm";
import { Elements } from '@stripe/react-stripe-js';  // Import Elements from Stripe
import { loadStripe } from '@stripe/stripe-js';  // Import loadStripe from Stripe



function App() {
  const stripePromise = loadStripe('pk_test_51QpRWNGOBWdkGRw0ZvcDq67gGtXySdQUxNZif5af8M7v1H12kAujDscDWXd4vcExcQXYNy5iSYreTU1CCZCpbCTU00AFm9G6td');
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupForm/>} />
        <Route path="/login" element={<LoginForm/>} />
        <Route 
        path="/payment" 
        element={
          <Elements stripe={stripePromise}>
            <PaymentForm />
          </Elements>
        } 
      />
        <Route path="/restaurants" element={<ListRestaurant />} />
        <Route path="/restaurants/add" element={<AddRestaurant />} />
        <Route path="/restaurants/:id" element={<SingleRestaurant />} />
        <Route path="/restaurants/:id/reviews" element={<AddReview />} />
 
        <Route path="/menu" element={<AddMenu />} />
      </Routes>
    </Router>
  );
}

export default App;
