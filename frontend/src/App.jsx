import "./App.css";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/views/Header";
import Footer from "./components/views/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
	return (
		<React.Fragment>
			<div className="flex flex-col h-full relative bg-gradient-to-bl from-orange-800 from-20% via-black via-60% to-black overflow-hidden">
				<Header className="-z-50" />
				<main className="container mx-auto px-3 pb-12 flex-grow">
					<Outlet />
				</main>
				<Footer />
				<ToastContainer theme="dark" />
			</div>
		</React.Fragment>
	);
}

export default App;
