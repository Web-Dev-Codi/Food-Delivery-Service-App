import Hero from "./Hero";
// import BottomNav from "./views/BottomNav";
import { CouponSlider } from "./CouponSlider";
import LandingPageRestaurants from "./LandingPageRestaurants";

const Home = () => {

	return (
		<div className="">
			<Hero />
			<CouponSlider />
			<LandingPageRestaurants />
			{/* <BottomNav /> */}
		</div>
	);
};

export default Home;
