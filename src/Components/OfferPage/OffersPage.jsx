import { useMemo, useState } from "react";

import OfferFilter from "./OfferFilter";
import FeaturedOffers from "./FeaturedOffers";
import PackageSection from "./PackageSection";
import PromoCodeSection from "./PromoCodeSection";
import CountdownTimer from "./CountdownTimer";
import MembershipOffers from "./MembershipOffers";
import WhyBookDirect from "./WhyBookDirect";
import Testimonials from "./Testimonials";
import FAQ from "./FAQ";
import Newsletter from "./Newsletter";
import FooterCTA from "./FooterCTA";
import offersData, {categories,packages,membershipTiers,whyBookDirect,testimonials,faqs,} from "./offersData";

import HeroSection from "./HeroSection";

export default function OffersPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOffers = useMemo(() => {
    return offersData.filter((offersdatas) => {
      const matchesCategory = activeCategory === "all" || offersdatas.category === activeCategory;
      const matchesSearch = offersdatas.title.toLowerCase().includes(searchTerm.toLowerCase().trim());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  const scrollToOffers = () => {
    document.getElementById("offers")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <HeroSection onViewOffers={scrollToOffers} />

      <OfferFilter
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      

      <FeaturedOffers offers={filteredOffers} />

      <PackageSection packages={packages} />

      <PromoCodeSection />

      <CountdownTimer />

      <MembershipOffers tiers={membershipTiers} />

      <WhyBookDirect items={whyBookDirect} />

      <Testimonials testimonials={testimonials} />

      <FAQ faqs={faqs} />

      <Newsletter />

      <FooterCTA onBookNow={scrollToOffers} />
    </div>
  );
}
