import { Link } from "react-router-dom";
import pizzaImg from "../assets/images/pizza.jpg";
import burgerImg from "../assets/images/burger.png";
import Avatar from "../assets/images/avatar.png";
import Hero2 from "../assets/images/food2.avif";

export default function HeroSection() {
	return (
		<section className="relative flex flex-col items-center p-2 py-10 w-full text-white h-auto md:h-[900px]">
			<div className="container mx-auto h-auto md:h-[700px] px-2">
				<div className="flex flex-col lg:flex-row items-center justify-between gap-8 py-4 md:py-8 lg:py-16">
					{/* Left Content */}
					<div className="w-full lg:w-1/2 space-y-4 md:space-y-6">
						<h1 className="text-5xl text-center flex flex-col md:text-left sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
							Healthy food delivered
							<br />
							<span className="text-[#D84418]">
								right to your door
							</span>
							fast
						</h1>

						<p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-xl">
							Lorem ipsum dolor sit amet, consectetur adipisicing
							elit. Architecto earum, nemo recusandae dignissimos
							saepe mollitia modi.
						</p>

						<div className="flex flex-col sm:flex-row gap-4">
							<Link
								to="/order"
								className="flex items-center justify-center px-6 py-5 bg-[#D84418] rounded-full text-white font-semibold hover:bg-[#c13915] transition-colors">
								Order Now
							</Link>
							<Link
								to="/menu"
								className="px-6 py-5 bg-transparent border-2 border-[#D84418] rounded-full text-white font-semibold flex items-center justify-center gap-2 hover:bg-[#D84418]/10 transition-colors">
								{/* <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
									<div className="w-3 h-3 border-t-[6px] border-t-[#D84418] border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent" />
								</span> */}
								View Menu
							</Link>
						</div>
					</div>

					{/* Right Content */}
					<div className="w-full h-[400px] sm:h-[500px] lg:h-[800px] relative">
						<div className="relative">
							{/* Main Image */}
							<div className="w-full h-[400px] sm:h-[500px] lg:h-[800px] relative">
								<img
									src={Hero2}
									alt="Hero"
									className="w-full h-full object-cover rounded-full bg-[#D84418]/20"
								/>
							</div>

							{/* Floating Elements */}
							<div className="absolute top-10 -left-4 bg-white p-3 rounded-xl shadow-lg">
								<img
									src="https://res.cloudinary.com/difmxsysx/image/upload/v1738520512/Indian-food-menu/omlet-starter_ftngrz.jpg"
									alt="Pizza"
									className="w-24 h-24 object-contain"
								/>
								<div className="mt-2">
									<p className="text-black font-semibold">
										Omelette
									</p>
									<div className="flex text-yellow-400 text-sm">
										★★★★★
									</div>
								</div>
							</div>

							<div className="absolute bottom-10 -right-4 bg-white p-3 rounded-xl shadow-lg">
								<img
									src="https://res.cloudinary.com/difmxsysx/image/upload/v1738584141/Buffalo_Wings_islhkv.jpg"
									alt="Buffalo Wings"
									className="w-28 h-24 object-contain"
								/>
								<div className="mt-2">
									<p className="text-black font-semibold">
										Buffalo Wings
									</p>
									<div className="flex text-yellow-400 text-sm">
										★★★★★
									</div>
								</div>
							</div>

							{/* Contact Card */}
							<div className="absolute bottom-20 left-10 bg-white text-black p-3 rounded-xl shadow-lg flex items-center gap-3">
								<div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
									<img
										src={Avatar}
										alt="Profile"
										className="w-8 h-8 rounded-full"
									/>
								</div>
								<div>
									<p className="font-semibold text-sm">
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
