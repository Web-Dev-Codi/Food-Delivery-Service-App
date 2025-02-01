import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListRestaurant from "./components/ListRestaurant";
import AddRestaurant from  "./components/AddRestaurant";
import SingleRestaurant from "./components/SingleRestaurant";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AddRestaurant/>} />
        <Route path="/restaurants" element={<ListRestaurant />} />
      
        <Route path="/restaurants/:id" element={<SingleRestaurant />} />
      </Routes>
    </Router>
  );
}

export default App;
