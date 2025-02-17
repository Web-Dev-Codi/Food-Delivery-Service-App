import { FaUser, FaBiking, FaWalking } from "react-icons/fa";

function LandingPageHeader() {
	return (
		<header className="flex justify-between items-center px-4 py-3 bg-transparent shadow-md text-white">
			<div className="flex items-center space-x-3">
				<FaWalking className="text-lg sm:text-xl" />
				<FaBiking className="text-lg sm:text-xl" />
			</div>
			<h4 className="text-sm sm:text-base md:text-lg font-semibold text-center">
				Delivery
				<p className="text-xs sm:text-sm">123 4th Street NY 20533</p>
			</h4>
			<FaUser className="text-lg sm:text-xl" />
		</header>
	);
}

export default LandingPageHeader;
