import { Link } from "react-router-dom";

// Mock Home screen for demonstration purposes
const HomeScreen = () => {
	return (
		<div className="flex flex-col gap-3">
			<h1 className="text-center">Homescreen</h1>
			<Link to="/cart">Go to Cart</Link>
			<Link to="/test-cart">Test Cart</Link>
			<Link
				className="rounded-md bg-yellow-500 h-7 w-auto"
				to="/menu">
				Click me to Demo Menu Page
			</Link>
		</div>
	);
};

export default HomeScreen;
