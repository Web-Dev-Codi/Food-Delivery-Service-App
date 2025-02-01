import "./App.css";
import React from "react";
import { Outlet } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <React.Fragment>
      <CartProvider>
        <Header />
        <main className="flex  h-svh place-items-center justify-center w-full">
          <Outlet />
        </main>
      </CartProvider>
      <Footer />
    </React.Fragment>
  );
}

export default App;
