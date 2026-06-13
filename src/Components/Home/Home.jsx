import AboutHotel from "../AboutHotel/AboutHotel";
import FeaturedRooms from "../FeaturesRooms/FeaturesRoom";
import HeroSection from "./Herosec";


const Home = () => {
    return (
        <div>
            <HeroSection></HeroSection>
            <AboutHotel></AboutHotel>
            <FeaturedRooms></FeaturedRooms>
        </div>
    );
};

export default Home;