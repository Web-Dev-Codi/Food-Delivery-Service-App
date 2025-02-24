import { useState } from "react";
import PropTypes from "prop-types";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { testimonials } from "./testimonials";
import { Star } from "lucide-react";

export default function TestimonialSlider() {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [loaded, setLoaded] = useState(false);
	const [sliderRef, instanceRef] = useKeenSlider({
		initial: 0,
		slideChanged(slider) {
			setCurrentSlide(slider.track.details.rel);
		},
		slides: {
			perView: 1,
			spacing: 20,
		},
		breakpoints: {
			"(min-width: 768px)": {
				slides: { perView: 2, spacing: 20 },
			},
			"(min-width: 1024px)": {
				slides: { perView: 3, spacing: 20 },
			},
		},
		created() {
			setLoaded(true);
		},
	});

	return (
		<div className="bg-transparent py-20 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-16">
					<h2 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-[#D84418] to-[#FF6B6B] bg-clip-text text-transparent">
						What Our Customers Say
					</h2>
					<p className="text-gray-400 max-w-2xl mx-auto">
						Real experiences from our valued customers, restaurant
						partners, and delivery team members.
					</p>
				</div>

				<div className="navigation-wrapper relative">
					<div
						ref={sliderRef}
						className="keen-slider">
						{testimonials.map((testimonial) => (
							<div
								key={testimonial.id}
								className="keen-slider__slide">
								<div className="bg-[#1A1A1A] p-6 rounded-2xl border-2 border-[#D84418] h-full transform transition-all duration-300 hover:border-opacity-80 hover:shadow-[0_0_15px_rgba(216,68,24,0.3)]">
									<div className="flex items-center mb-4">
										<img
											src={testimonial.image}
											alt={testimonial.name}
											className="w-12 h-12 rounded-full mr-4"
										/>
										<div>
											<h3 className="text-white font-semibold">
												{testimonial.name}
											</h3>
											<p className="text-gray-400 text-sm">
												{testimonial.location}
											</p>
										</div>
									</div>
									<div className="flex mb-4">
										{[...Array(testimonial.rating)].map(
											(_, i) => (
												<Star
													key={i}
													className="w-5 h-5 text-[#D84418]"
													fill="#D84418"
												/>
											)
										)}
									</div>
									<p className="text-gray-300 mb-4">
										{testimonial.text}
									</p>
									<p className="text-[#D84418] text-sm font-medium">
										{testimonial.role}
									</p>
								</div>
							</div>
						))}
					</div>

					{loaded && instanceRef.current && (
						<>
							<Arrow
								left
								onClick={(e) =>
									e.stopPropagation() ||
									instanceRef.current?.prev()
								}
								disabled={currentSlide === 0}
							/>
							<Arrow
								onClick={(e) =>
									e.stopPropagation() ||
									instanceRef.current?.next()
								}
								disabled={
									currentSlide ===
									instanceRef.current.track.details.slides
										.length -
										1
								}
							/>
						</>
					)}
				</div>

				{loaded && instanceRef.current && (
					<div className="flex justify-center mt-8 gap-2">
						{[
							...Array(
								instanceRef.current.track.details.slides.length
							),
						].map((_, idx) => (
							<button
								key={idx}
								onClick={() => {
									instanceRef.current?.moveToIdx(idx);
								}}
								className={`w-2 h-2 rounded-full transition-all duration-300 ${
									currentSlide === idx
										? "bg-[#D84418] w-6"
										: "bg-gray-600 hover:bg-gray-500"
								}`}
								aria-label={`Go to slide ${idx + 1}`}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

function Arrow({ left, onClick, disabled }) {
	return (
		<button
			onClick={onClick}
			className={`absolute top-1/2 -translate-y-1/2 ${
				left ? "left-0" : "right-0"
			} ${
				disabled
					? "opacity-30 cursor-not-allowed"
					: "opacity-75 hover:opacity-100"
			} bg-[#D84418] text-white p-2 rounded-full transform transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#D84418] focus:ring-opacity-50 z-10`}
			disabled={disabled}
			aria-label={left ? "Previous slide" : "Next slide"}>
			<svg
				className={`w-6 h-6 ${left ? "rotate-180" : ""}`}
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24">
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M9 5l7 7-7 7"
				/>
			</svg>
		</button>
	);
}

Arrow.propTypes = {
	left: PropTypes.bool,
	onClick: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
};

Arrow.defaultProps = {
	left: false,
	disabled: false,
};
