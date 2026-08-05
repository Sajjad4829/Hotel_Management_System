import HeroSection from "../Components/Home/Herosec";
import SearchBookingBar from "../Components/Bookingsearch/BookingSearch";
import FeaturedRooms from "../Components/FeaturesRooms/FeaturesRoom";
import FacilitiesPreview from "../Components/FacilityPreview/Facilitiespreview";
import TestimonialsPage from "../Components/Testimonials/Testimonials";
import AiRecommendedDestinations from "../Components/Home/AiRecommendedDestinations";

export const componentRegistry = {
  hero: HeroSection,
  bookingSearch: SearchBookingBar,
  featuredCollection: FeaturedRooms,
  aiRecommended: AiRecommendedDestinations,
  facilities: FacilitiesPreview,
  reviews: TestimonialsPage
};
