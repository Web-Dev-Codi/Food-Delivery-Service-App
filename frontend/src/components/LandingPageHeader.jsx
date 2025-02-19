import { FaUser, FaBiking, FaWalking } from "react-icons/fa";

function LandingPageHeader() {
	return (
		<div className="">
			<section className="flex justify-between items-center bg-transparent text-white mx-auto">
				<div className="flex items-center space-x-3">
					<FaWalking className="text-lg sm:text-xl" />
					<FaBiking className="text-lg sm:text-xl" />
				</div>
				<h4 className="text-sm sm:text-base md:text-lg font-semibold text-center">
					Delivery
					<p className="text-xs sm:text-sm">
						123 4th Street NY 20533
					</p>
				</h4>
				<FaUser className="text-lg sm:text-xl" />
			</section>
		</div>
	);
}

export default LandingPageHeader;
