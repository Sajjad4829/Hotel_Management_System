import FacilitiesPreview from "../FacilityPreview/Facilitiespreview";
import FeaturedRooms from "../FeaturesRooms/FeaturesRoom";
import HeroSection from "./Herosec";


const Home = () => {
    return (
        <div>
            <HeroSection></HeroSection>
            <FeaturedRooms></FeaturedRooms>
            <FacilitiesPreview></FacilitiesPreview>
        </div>
    );
};

export default Home;