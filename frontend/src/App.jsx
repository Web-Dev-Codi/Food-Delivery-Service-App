import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListRestaurant from "./components/ListRestaurant";
import AddRestaurant from  "./components/AddRestaurant";
import SingleRestaurant from "./components/SingleRestaurant";
import AddMenu from "./components/AddMenu";
import AddReview from "./components/AddReview";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupForm/>} />
        <Route path="/login" element={<LoginForm/>} />
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
