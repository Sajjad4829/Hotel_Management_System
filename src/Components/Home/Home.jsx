import HotelContactSection from "../Contact/Contact";
import FacilitiesPreview from "../FacilityPreview/Facilitiespreview";
import FeaturedRooms from "../FeaturesRooms/FeaturesRoom";
import TestimonialsPage from "../Testimonials/Testimonials";
import HeroSection from "./Herosec";


const Home = () => {
    return (
        <div>
            <HeroSection></HeroSection>
            <FeaturedRooms></FeaturedRooms>
            <FacilitiesPreview></FacilitiesPreview>
            <TestimonialsPage></TestimonialsPage>
            <HotelContactSection></HotelContactSection>
        </div>
    );
};

export default Home;