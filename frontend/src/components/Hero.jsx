import Hero2 from "../assets/images/food2.avif";
import { Link } from "react-router-dom";

export default function HeroSection() {
	return (
		<div className="flex flex-col items-center justify-center w-full">
			<section className="bg-transparent text-white">
				<div className="container flex flex-col justify-center py-6 gap-10 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-center">
					<div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
						<h1 className="text-5xl font-bold leading-none sm:text-6xl">
							Healthy food <br />
							<span className="dark:text-[#D84418] mr-4">
								right
							</span>
							to your door fast!
						</h1>
						<p className="mt-6 mb-8 text-lg sm:mb-12">
							lorem ipsum dolor sit amet, consectetur adipiscing
							elit. Dictum aliquam porta in condimentum ac
							integer.
							<br className="hidden md:inline lg:hidden" />
							turpis pulvinar, est scelerisque ligula sem
						</p>
						<div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
							<Link
								to="/menu"
								rel="noopener noreferrer"
								href="#"
								className="px-8 py-3 text-lg font-semibold rounded dark:bg-violet-600 dark:text-gray-50">
								Order Now
							</Link>
							<Link
								to="/login"
								rel="noopener noreferrer"
								href="#"
								className="px-8 py-3 text-lg bg-[#D84418] font-semibold border rounded border-[#D84418]">
								Login
							</Link>
						</div>
					</div>
					<div className="flex items-center justify-center w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]flex">
						<img
							src={Hero2}
							alt=""
							className="w-full h-full object-contain"
						/>
					</div>
				</div>
			</section>
		</div>
	);
}
