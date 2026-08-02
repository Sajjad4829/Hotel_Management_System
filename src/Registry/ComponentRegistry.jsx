import HeroSection from "../Components/Home/Herosec";
import SearchBookingBar from "../Components/Bookingsearch/BookingSearch";
import FeaturedRooms from "../Components/FeaturesRooms/FeaturesRoom";
import FacilitiesPreview from "../Components/FacilityPreview/Facilitiespreview";
import TestimonialsPage from "../Components/Testimonials/Testimonials";
import HotelContactSection from "../Components/Contact/Contact";

export const componentRegistry = {
  hero: HeroSection,
  bookingSearch: SearchBookingBar,
  featuredCollection: FeaturedRooms,
  facilities: FacilitiesPreview,
  reviews: TestimonialsPage,
  contact: HotelContactSection
};
