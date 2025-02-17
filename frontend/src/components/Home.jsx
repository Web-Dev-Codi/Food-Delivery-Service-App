import Hero from "./Hero";
import LandingPageHeader from "./LandingPageHeader";
// import BottomNav from "./views/BottomNav";
import { CouponSlider } from "./CouponSlider";
import LandingPageRestaurants from "./LandingPageRestaurants";
// import { useNavigate } from "react-router-dom";

const Home = () => {
	// const [searchQuery, setSearchQuery] = useState("");

	// const  navigate = useNavigate();

	// const handleSearch = async () => {
	//   if (searchQuery.trim() !== "") {
	//     try {
	//       const response = await axios.get(
	//         `http://localhost:8000/api/restaurants/name/${searchQuery}`
	//       );

	//       const restaurant = response.data.data;

	//       if (restaurant && restaurant._id) {
	//         // Navigate to the restaurant's page using its ID
	//         navigate(`/restaurants/${restaurant._id}`);
	//       } else {
	//         alert("Restaurant not found.");
	//       }
	//     } catch (error) {
	//       console.error("Error fetching restaurant:", error);
	//       alert("An error occurred while searching for the restaurant.");
	//     }
	//   }
	// };

	return (
		<div className="flex flex-col min-h-screen">
			<LandingPageHeader />
			<Hero />
			<CouponSlider />
			<LandingPageRestaurants />
			{/* <BottomNav /> */}
		</div>
	);
};

export default Home;
