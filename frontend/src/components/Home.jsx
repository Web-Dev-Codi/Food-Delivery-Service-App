import Hero from "./Hero";
// import BottomNav from "./views/BottomNav";
import { CouponSlider } from "./CouponSlider";
import LandingPageRestaurants from "./LandingPageRestaurants";
import DeliveryInfo from "./DeliveryInfo";

const Home = () => {
	return (
		<div className="">
			<Hero />
			<DeliveryInfo />
			<CouponSlider />
			<LandingPageRestaurants />
			{/* <BottomNav /> */}
		</div>
	);
};

export default Home;
