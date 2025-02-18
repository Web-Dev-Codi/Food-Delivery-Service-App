import "./App.css";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/views/Header";
import Footer from "./components/views/Footer";

function App() {
	return (
		<React.Fragment>
			<div className="flex flex-col h-[100vh] bg-gradient-to-b from-[#0B1225] via-[#382677] to-[#050913] backdrop-blur-xl">
				<Header />
				<main className="container mx-auto px-3 pb-12 flex-grow">
					<Outlet />
				</main>
				<Footer />
			</div>
		</React.Fragment>
	);
}

export default App;
