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
		arrows: true,
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

	const uniqueCoupons = coupons.filter(
		(coupon, index, self) =>
			index === self.findIndex((c) => c._id === coupon._id)
	);

	return (
		<div className="flex flex-col items-center justify-center w-full">
			<div className="w-2/3 mx-auto">
				{uniqueCoupons.length > 0 ? (
					<Slider {...sliderSettings}>
						{coupons.map((coupon) => (
							<div
								key={coupon._id}
								className=" p-4 bg-neutral-100/20 backdrop-blur rounded-lg shadow-lg h-[300px]">
								<div className="text-red-700 text-lg sm:text-2xl font-bold">
									{coupon.discount}% OFF
								</div>
								<div className="text-neutral-800 text-sm sm:text-lg font-semibold mt-2">
									{coupon.description}
								</div>
								<div className="text-xs text-black-600 mt-2">
									<span>
										Valid From:{" "}
										{new Date(
											coupon.validFrom
										).toLocaleDateString()}
									</span>
									<br />
									<span>
										Valid Until:{" "}
										{new Date(
											coupon.validUntil
										).toLocaleDateString()}
									</span>
									<br />
									<span>
										Code: <strong>{coupon.code}</strong>
									</span>
									<br />
									<span>
										Applicable To:{" "}
										{coupon.applicableToRestaurants
											?.length > 0
											? coupon.applicableToRestaurants
													.map((res) => res.name)
													.join(", ")
											: "All Restaurants"}
									</span>
								</div>
							</div>
						))}
					</Slider>
				) : (
					<p className="text-center text-gray-600">
						No coupons available at the moment.
					</p>
				)}
			</div>
		</div>
	);
};
