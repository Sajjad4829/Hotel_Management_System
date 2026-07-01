import SearchBookingBar from "../Bookingsearch/BookingSearch";
import HotelContactSection from "../Contact/Contact";
import FacilitiesPreview from "../FacilityPreview/Facilitiespreview";
import FeaturedRooms from "../FeaturesRooms/FeaturesRoom";
import TestimonialsPage from "../Testimonials/Testimonials";
import HeroSection from "./Herosec";


const Home = () => {
    return (
        <div>
            <SearchBookingBar />
            <HeroSection />
            <FeaturedRooms />
            <FacilitiesPreview />
            <TestimonialsPage />
            <HotelContactSection />
        </div>
    );
};

export default Home;