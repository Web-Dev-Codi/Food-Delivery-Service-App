import "./App.css";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/views/Header";
import Footer from "./components/views/Footer";
import Hero from "./components/Hero"; // Import the Hero component

function App() {
  return (
    <React.Fragment>
      <Header />
      <main className="bg-gradient-to-b from-[#0B1225] via-[#382677] to-[#050913] flex flex-col backdrop-blur-xl">
        <Hero />
        <Outlet />
      </main>

      <Footer />
    </React.Fragment>
  );
}

export default App;
