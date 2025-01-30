import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layouts from "./components/Layouts";
import Home from "./components/pages/Home";
import "./App.css";
//import LoginForm from "./components/LoginForm";
//import SignupForm from "./components/SignupForm";
import Header from "./components/views/Header";
import Footer from "./components/views/Footer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layouts />}>
          <Route index element={<Home />} />
        </Route>
        {/* Header and Footer Routes and other static pages */}
        <Route path="/header" element={<Header />} />
        <Route path="/footer" element={<Footer />} />
        {/* Authentication Routes */}
        {/*<LoginForm />*/}
        {/*<SignupForm />*/}
      </Routes>
    </Router>
  );
}

export default App;
