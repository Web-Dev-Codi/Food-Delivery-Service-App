import "./App.css";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

// import LoginForm from "./components/LoginForm";
// import SignupForm from "./components/SignupForm";

function App() {
  return (
    <React.Fragment>
      <Header />
      <main className="flex  h-svh place-items-center justify-center w-full">
        <Outlet />
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default App;
