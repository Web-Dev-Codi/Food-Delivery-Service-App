import "./App.css";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/views/Header";
import Footer from "./components/views/Footer";

function App() {
	return (
		<React.Fragment>
			<Header />
			<main className="bg-gradient-to-b from-[#0B1225] via-[#382677] to-[#050913] flex flex-col backdrop-blur-xl">
				<Outlet />
			</main>
			<Footer />
		</React.Fragment>
	);
}

export default App;
