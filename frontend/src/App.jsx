import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layouts from "./components/Layouts";
import Home from "./components/Home";
import ListRestaurant from "./components/ListRestaurant";
import AddRestaurant from "./components/AddRestaurant";
import AddMenu from "./components/AddMenu";
import AddReview from "./components/AddReview";
import SingleRestaurant from "./components/SingleRestaurant";
import LoginForm from "./components/LoginForm"; // Import LoginForm

function App() {
  return (
    <Router>
      <Routes>
        {/* Layouts wraps all pages to ensure Header and Footer are visible */}
        <Route path="/" element={<Layouts />}>
          <Route index element={<Home />} />
          <Route path="add-restaurant" element={<AddRestaurant />} />
          <Route path="restaurants" element={<ListRestaurant />} />
          <Route path="restaurants/:id" element={<SingleRestaurant />} />
          <Route path="restaurants/:id/review" element={<AddReview />} />
          <Route path="menu" element={<AddMenu />} />
        </Route>

        {/* Add the login route outside of Layouts to appear separately */}
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </Router>
  );
}

export default App;
