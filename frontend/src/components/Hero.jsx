import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import Avatar from "../assets/images/avatar.png";
import animationData from "../assets/animations/scooterAnimation.json"; // Import the animation JSON

export default function HeroSection() {
	return (
		<section className="relative flex flex-col items-center p-2 py-10 w-full text-white h-auto md:h-[900px]">
			<div className="container mx-auto h-auto md:h-[500px] px-2">
				<div className="flex flex-col lg:flex-row items-center justify-between gap-8 py-4 md:py-8 lg:py-16">
					{/* Left Content */}
					<div className="w-full lg:w-1/2 space-y-4 md:space-y-6">
						<h1 className="text-5xl text-center flex flex-col md:text-left sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
							Locally Inspired
							<br />
							<span className="text-[#FF5733] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] tracking-wide">
								Crave It. Click It. Get It
							</span>
							Delivered Fast
						</h1>

						<p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-xl">
							Four Flavours Express brings the bold, authentic
							flavors straight to your door. No waits, no
							hassle—just fresh, flavorful food delivered fast.
							Order now and taste the world!
						</p>
						<div className="flex flex-col sm:flex-row gap-4">
							<Link
								to="/restaurants"
								className="flex items-center justify-center px-6 py-5 bg-[#D84418] rounded-full text-white font-semibold hover:bg-[#c13915] transition-colors">
								Order Now
							</Link>
							<Link
								to="/restaurants"
								className="px-6 py-5 bg-transparent border-2 border-[#D84418] rounded-full text-white font-semibold flex items-center justify-center gap-2 hover:bg-[#D84418]/10 transition-colors">
								{/* <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
									<div className="w-3 h-3 border-t-[6px] border-t-[#D84418] border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent" />
								</span> */}
								View Restaurants
							</Link>
						</div>
					</div>
					{/* Right Content */}
					<div className="w-full flex items-center justify-center h-full sm:h-[600px] lg:h-[800px] relative">
						<div className="relative h-full w-full flex items-center justify-center">
							{/* Main Image */}
							<div className="w-[150%] sm:w-[150%] lg:w-[180%] scale-125 relative flex items-center justify-center overflow-hidden">
								<Lottie
									animationData={animationData}
									loop={true}
									autoPlay={true}
									className="w-full h-full"
								/>
							</div>
							{/* Floating Elements */}
							<div className="absolute top-[10%] left-[10%] bg-white p-2 rounded-xl shadow-lg sm:w-[200px] lg:w-auto transform scale-50 sm:scale-75 lg:scale-100 origin-top-left">
								<img
									src="https://res.cloudinary.com/difmxsysx/image/upload/v1738520512/Indian-food-menu/omlet-starter_ftngrz.jpg"
									alt="Pizza"
									className="w-20 sm:w-24 h-20 sm:h-24 object-contain"
								/>
								<div className="">
									<p className="text-black font-semibold text-sm sm:text-base">
										Omelette
									</p>
									<div className="flex text-yellow-400 text-xs sm:text-sm">
										★★★★★
									</div>
								</div>
							</div>
							<div className="absolute bottom-[76%] right-[35%] bg-white p-2 rounded-xl shadow-lg sm:w-[200px] lg:w-auto transform scale-50 sm:scale-75 lg:scale-100 origin-bottom-right">
								<img
									src="https://res.cloudinary.com/difmxsysx/image/upload/v1738584141/Buffalo_Wings_islhkv.jpg"
									alt="Buffalo Wings"
									className="w-24 sm:w-28 h-20 sm:h-24 object-contain"
								/>
								<div className="mt-2">
									<p className="text-black font-semibold text-sm sm:text-base">
										Buffalo Wings
									</p>
									<div className="flex text-yellow-400 text-xs sm:text-sm">
										★★★★★
									</div>
								</div>
							</div>
							{/* Contact Card */}
							<div className="absolute bottom-[35%] left-[15%] bg-white text-black p-2 rounded-xl shadow-lg flex items-center gap-2 sm:gap-3 transform scale-50 sm:scale-75 lg:scale-100 origin-bottom-left">
								<div className="w-8 sm:w-10 h-8 sm:h-10 bg-orange-100 rounded-full flex items-center justify-center">
									<img
										src={Avatar}
										alt="Profile"
										className="w-6 sm:w-8 h-6 sm:h-8 rounded-full"
									/>
								</div>
								<div>
									<p className="font-semibold text-xs sm:text-sm">
										Ojoy Kumar
									</p>
									<p className="text-xs text-gray-500">
										Food Driver
									</p>
								</div>
								<div className="w-8 h-8 bg-[#D84418] rounded-full flex items-center justify-center ml-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-4 w-4 text-white"
										viewBox="0 0 20 20"
										fill="currentColor">
										<path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
									</svg>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
