import { usePageContext } from "../../Context/PageContext";
import HeroSection from "./HeroSection";
import FeaturedLuxuryOffer from "./PremiumSections/FeaturedLuxuryOffer";
import ExclusiveExperiences from "./PremiumSections/ExclusiveExperiences";
import SeasonalOffers from "./PremiumSections/SeasonalOffers";
import LuxuryAmenities from "./PremiumSections/LuxuryAmenities";
import LimitedTimeDeal from "./PremiumSections/LimitedTimeDeal";
import WhyGuestsLove from "./PremiumSections/WhyGuestsLove";
import GuestExperience from "./PremiumSections/GuestExperience";
import BookingJourney from "./PremiumSections/BookingJourney";
import PremiumFAQ from "./PremiumSections/PremiumFAQ";
import FinalBookingCTA from "./PremiumSections/FinalBookingCTA";

export default function OffersPage() {
  const { pagesData } = usePageContext();
  const heroData = pagesData?.offers?.hero || {};

  const scrollToOffers = () => {
    document.getElementById("offers-start")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-amber-500/30 selection:text-amber-900 overflow-x-hidden">
      {/* 
        The HeroSection must remain exactly as it is, untouched. 
        It controls the hero image and standard UI for the page header. 
      */}
      <HeroSection onViewOffers={scrollToOffers} data={heroData} />

      <div id="offers-start">
        <FeaturedLuxuryOffer />
        <ExclusiveExperiences />
        <SeasonalOffers />
        <LuxuryAmenities />
        <LimitedTimeDeal />
        <WhyGuestsLove />
        <GuestExperience />
        <BookingJourney />
        <PremiumFAQ />
        <FinalBookingCTA />
      </div>
    </div>
  );
}
