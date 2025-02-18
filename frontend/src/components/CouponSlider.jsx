/* eslint-disable no-unused-vars */
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect } from "react";
import axios from "axios";

export const CouponSlider = () => {
	const [errorMessage, setErrorMessage] = useState("");
	const [coupons, setCoupons] = useState([]);

	useEffect(() => {
		const fetchCoupons = async () => {
			try {
				const response = await axios.get(
					"http://localhost:8000/offers"
				);
				setCoupons(response.data.data);
			} catch (error) {
				setErrorMessage(
					error.response?.data?.message ||
						"An error occurred while fetching coupons"
				);
			}
		};
		fetchCoupons();
	}, []);

	const sliderSettings = {
		dots: true,
		infinite: true,
		speed: 1000,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: false,
		autoplaySpeed: 3000,
		arrows: false,
		// responsive: [
		// 	{
		// 		breakpoint: 480, // Mobile screens
		// 		settings: {
		// 			slidesToShow: 1,
		// 			slidesToScroll: 1,
		// 		},
		// 	},
		// 	{
		// 		breakpoint: 768, // Small screens
		// 		settings: {
		// 			slidesToShow: 2,
		// 			slidesToScroll: 2,
		// 		},
		// 	},
		// 	{
		// 		breakpoint: 1024, // Medium screens
		// 		settings: {
		// 			slidesToShow: 2,
		// 			slidesToScroll: 2,
		// 		},
		// 	},
		// 	{
		// 		breakpoint: 1440, // Large screens
		// 		settings: {
		// 			slidesToShow: 4,
		// 			slidesToScroll: 4,
		// 		},
		// 	},
		// ],
	};

	const customerProfiles = [
		"https://randomuser.me/api/portraits/men/1.jpg",
		"https://randomuser.me/api/portraits/women/2.jpg",
		"https://randomuser.me/api/portraits/men/3.jpg",
		"https://randomuser.me/api/portraits/women/4.jpg",
		"https://randomuser.me/api/portraits/men/5.jpg",
	];

	const foodImages = [
		"https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
	];

	const uniqueCoupons = coupons.filter(
		(coupon, index, self) =>
			index === self.findIndex((c) => c._id === coupon._id)
	);

	return (
		<div className="w-full py-8 sm:py-8 md:py-12">
			<Slider {...sliderSettings}>
				{uniqueCoupons.map((coupon) => (
					<div
						key={coupon._id}
						className="">
						<div className="bg-[#FF4500] rounded-xl p-4 sm:p-6 flex flex-col lg:flex-row justify-between items-center relative overflow-hidden gap-6 lg:gap-0">
							{/* Left content */}
							<div className="flex-1 text-white text-center lg:text-left">
								<h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
									{coupon.description}
									<br />
									<span className="text-lg sm:text-xl md:text-2xl">
										Code: <strong>{coupon.code}</strong>
									</span>
								</h2>

								{/* Customer Reviews */}
								<div className="mt-4 flex flex-col items-center lg:items-start">
									<div className="flex items-center mb-2">
										<div className="flex -space-x-2">
											{customerProfiles.map(
												(profile, index) => (
													<img
														key={index}
														src={profile}
														alt={`Customer ${
															index + 1
														}`}
														className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white"
													/>
												)
											)}
										</div>
									</div>
									<div className="flex items-center">
										<span className="text-yellow-400">
											★
										</span>
										<span className="ml-1 text-white">
											4.8
										</span>
										<span className="ml-2 text-white/80">
											(2.3k Reviews)
										</span>
									</div>
								</div>
							</div>

							{/* Right content */}
							<div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
								<div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white order-2 sm:order-1">
									{coupon.discount}% OFF
								</div>
								<div className="order-1 sm:order-2">
									<img
										src={foodImages[0]}
										alt="Featured dish"
										className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full object-cover"
									/>
								</div>
							</div>
						</div>
					</div>
				))}
			</Slider>
		</div>
	);
};
