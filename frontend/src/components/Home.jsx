import Hero from "./Hero";
import { CouponSlider } from "./CouponSlider";
import LandingPageRestaurants from "./LandingPageRestaurants";
import ImpactStatistics from "./views/ImpactStatistics";
import DeliveryInfo from "./DeliveryInfo";
import TestimonialSlider from "./views/TestimonialSlider";

const Home = () => {
	return (
		<div className="">
			<Hero />
			<DeliveryInfo />
			<CouponSlider />
			<LandingPageRestaurants />
			<ImpactStatistics />
			<TestimonialSlider />
		</div>
	);
};

export default Home;
