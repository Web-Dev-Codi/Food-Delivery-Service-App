import Hero from "./Hero";
// import BottomNav from "./views/BottomNav";
import { CouponSlider } from "./CouponSlider";
import LandingPageRestaurants from "./LandingPageRestaurants";
import ImpactStatistics from "./views/ImpactStatistics";
import DeliveryInfo from "./DeliveryInfo";

const Home = () => {
	return (
		<div className="">
			<Hero />
			<DeliveryInfo />
			<CouponSlider />
			<LandingPageRestaurants />
			<ImpactStatistics />
			{/* <BottomNav /> */}
		</div>
	);
};

export default Home;
