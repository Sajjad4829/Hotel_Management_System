import React, { createContext, useContext, useState, useEffect } from 'react';

// Default schema for all pages
const defaultPagesData = {
  home: {
    layout: [
      "bookingSearch",
      "hero",
      "featuredCollection",
      "facilities",
      "reviews",
      "contact"
    ],
    navbar: {
      logoImage: "",
      websiteName: "Haven Admin",
      navMenu: [
        { id: 1, label: "Home", link: "/" },
        { id: 2, label: "Hotels", link: "/hotels" },
        { id: 3, label: "Rooms", link: "/rooms" },
        { id: 4, label: "Contact", link: "/contact" }
      ],
      headerButtons: [
        { id: 1, label: "Book Now", link: "/booking" },
        { id: 2, label: "Login", link: "/login" }
      ],
      isSticky: true,
      headerBgColor: "#ffffff",
      textColor: "#333333",
      buttonColor: "#d97706",
      showSearchIcon: true,
      showWishlistIcon: true,
      showNotificationIcon: true,
      showProfileIcon: true
    },
    hero: {
      isVisible: true,
      badgeText: "Aurum Hotel & Resort",
      titlePrefix: "Experience",
      highlightText: "Luxury",
      titleSuffix: "& Comfort",
      description: "Book your perfect stay with us and enjoy world-class hospitality crafted for every detail of your journey.",
      slides: [
        {
          image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1920&q=80",
          label: "Luxury Resort"
        },
        {
          image: "https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?auto=format&fit=crop&w=1920&q=80",
          label: "Modern Suite"
        },
        {
          image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1920&q=80",
          label: "Tranquil Spa"
        }
      ],
      primaryButtonText: "Book Now",
      primaryButtonLink: "/booking",
      primaryButtonColor: "#d97706",
      secondaryButtonText: "Explore Rooms",
      secondaryButtonLink: "/rooms",
      overlayIntensity: "medium",
      sliderInterval: 5000
    },
    bookingSearch: { 
      isVisible: true,
      cardBgColor: "#ffffff",
      
      // Destination
      showDestination: true,
      destinationLabel: "Destination",
      destinationPlaceholder: "Where to?",
      destinationOptions: ["Dhaka", "Cox's Bazar", "Sylhet", "Chattogram", "Rajshahi", "Khulna", "Bandarban", "Rangamati"],
      
      // Dates
      showCheckIn: true,
      checkInLabel: "Check-in",
      showCheckOut: true,
      checkOutLabel: "Check-out",
      
      // Guests
      showAdults: true,
      adultsLabel: "Adults",
      adultsMax: 6,
      showChildren: true,
      childrenLabel: "Children",
      childrenMax: 4,
      
      // Rooms
      showRooms: true,
      roomsLabel: "Rooms",
      roomsMax: 4,
      
      // Button
      buttonText: "Search",
      buttonBgColor: "#d97706",
      buttonTextColor: "#ffffff"
    },
    featuredCollection: {
      isVisible: true,
      title: "Curated Destinations",
      subtitle: "Discover our most popular locations and hand-picked properties — each destination crafted to exceed every expectation.",
      destinations: [
        {
          id: "dhaka",
          name: "Dhaka",
          slug: "dhaka",
          description: "The vibrant capital of Bangladesh, known for its rich history, bustling streets, and cultural heritage.",
          image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200&q=80",
          highlights: "Lalbagh Fort, Ahsan Manzil, National Museum",
          hotelsCount: 15,
          buttonText: "Explore Destination",
          buttonLink: "/destination/dhaka",
          isVisible: true,
          details: {
            hero: { bgImage: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1920&q=80", pageLabel: "Destination", title: "Dhaka", description: "Dhaka is a city that never sleeps, offering a blend of rich history and modern lifestyle.", backButtonText: "Back", ctaButtonText: "Explore Options", ctaButtonLink: "#" },
            topHighlights: { sectionTitle: "Top Highlights", items: [{ name: "Lalbagh Fort", icon: "CheckCircle" }, { name: "Ahsan Manzil", icon: "CheckCircle" }, { name: "National Museum", icon: "CheckCircle" }] },
            hotelsList: { sectionTitle: "Hotels in Dhaka", totalBadge: "15 Properties", items: [] },
            ctaBox: { title: "Ready to explore?", description: "Book your stay in Dhaka today.", buttonText: "Search Availability", buttonLink: "/search-results" },
            gallery: { items: [] },
            attractions: { items: [] },
            travelInfo: { bestTimeToVisit: "", weather: "", transportation: "", localTips: "" },
            seo: { slug: "dhaka", metaTitle: "Dhaka Hotels & Tourism", metaDescription: "Explore Dhaka with our curated hotels.", featuredImage: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200&q=80", status: "Published" }
          }
        },
        {
          id: "coxs-bazar",
          name: "Cox's Bazar",
          slug: "coxs-bazar",
          description: "Home to the world's longest natural sea beach, a perfect getaway for ocean lovers and sun seekers.",
          image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
          highlights: "Inani Beach, Himchari National Park",
          hotelsCount: 22,
          buttonText: "Explore Destination",
          buttonLink: "/destination/coxs-bazar",
          isVisible: true,
          details: {
            hero: { bgImage: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1920&q=80", pageLabel: "Destination", title: "Cox's Bazar", description: "Cox's Bazar is renowned for its golden sandy beach and breathtaking sunsets over the Bay of Bengal.", backButtonText: "Back", ctaButtonText: "Explore Options", ctaButtonLink: "#" },
            topHighlights: { sectionTitle: "Top Highlights", items: [{ name: "Inani Beach", icon: "CheckCircle" }, { name: "Himchari National Park", icon: "CheckCircle" }] },
            hotelsList: { sectionTitle: "Hotels in Cox's Bazar", totalBadge: "22 Properties", items: [] },
            ctaBox: { title: "Ready to explore?", description: "Book your stay in Cox's Bazar.", buttonText: "Search Availability", buttonLink: "/search-results" },
            gallery: { items: [] },
            attractions: { items: [] },
            travelInfo: { bestTimeToVisit: "", weather: "", transportation: "", localTips: "" },
            seo: { slug: "coxs-bazar", metaTitle: "Cox's Bazar Sea Beach", metaDescription: "Relax at the world's longest natural sea beach.", featuredImage: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80", status: "Published" }
          }
        },
        {
          id: "sylhet",
          name: "Sylhet",
          slug: "sylhet",
          description: "A serene land of tea gardens, rolling hills, and breathtaking waterfalls in northeastern Bangladesh.",
          image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
          highlights: "Ratargul Swamp Forest, Bisanakandi",
          hotelsCount: 12,
          buttonText: "Explore Destination",
          buttonLink: "/destination/sylhet",
          isVisible: true,
          details: {
            hero: { bgImage: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1920&q=80", pageLabel: "Destination", title: "Sylhet", description: "Experience the tranquility of Sylhet with its endless tea estates and lush green landscapes.", backButtonText: "Back", ctaButtonText: "Explore Options", ctaButtonLink: "#" },
            topHighlights: { sectionTitle: "Top Highlights", items: [{ name: "Ratargul Swamp Forest", icon: "CheckCircle" }, { name: "Bisanakandi", icon: "CheckCircle" }] },
            hotelsList: { sectionTitle: "Hotels in Sylhet", totalBadge: "12 Properties", items: [] },
            ctaBox: { title: "Ready to explore?", description: "Book your serene getaway in Sylhet.", buttonText: "Search Availability", buttonLink: "/search-results" },
            gallery: { items: [] },
            attractions: { items: [] },
            travelInfo: { bestTimeToVisit: "", weather: "", transportation: "", localTips: "" },
            seo: { slug: "sylhet", metaTitle: "Sylhet Tea Gardens & Tourism", metaDescription: "Discover the natural beauty of Sylhet.", featuredImage: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80", status: "Published" }
          }
        }
      ]
    },
    curatedCollection: { title: "Curated Rooms" },
    aiSection: { title: "AI Assistant" },
    curatedDestinations: { title: "Explore Destinations", description: "Our Curated Destinations" },
    facilities: { title: "Our Facilities" },
    reviews: { title: "Guest Reviews" },
    cta: { title: "Ready to Experience Luxury Stay", buttonText: "Book Now" },
    newsletter: { title: "Subscribe", description: "Join our newsletter" },
    footer: { copyright: "© 2026 Haven" }
  },
  hotels: {
    heroTitle: "Our Premium Hotels",
    heroSubtitle: "Find your next getaway",
  },
  rooms: {
    heroTitle: "Luxurious Accommodations",
    heroSubtitle: "Rest in unmatched comfort",
  },
  contact: {
    title: "Get In Touch",
    email: "contact@havenhotels.com",
    phone: "+1 (555) 123-4567",
  }
};

const PageContext = createContext();

export function PageProvider({ children }) {
  const [pagesData, setPagesData] = useState(() => {
    // Load from localStorage if available, else use default
    const saved = localStorage.getItem('havenPagesData');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        
        // Make sure we have the new nested format and all sections
        if (!parsed.home || parsed.home.heroTitle || !parsed.home.layout || !parsed.home.navbar || parsed.home.bookingSearch?.isVisible === undefined || parsed.home.hero?.slides === undefined || parsed.home.featuredCollection?.destinations === undefined) {
          console.log("Migrating PageBuilder data: Resetting or merging home page to new nested format.");
          
          const existingHome = parsed.home || {};
          
          parsed.home = {
            ...defaultPagesData.home,
            ...(!existingHome.heroTitle ? existingHome : {}),
            hero: {
                ...defaultPagesData.home.hero,
                ...(existingHome.hero || {})
            },
            bookingSearch: {
                ...defaultPagesData.home.bookingSearch,
                ...(existingHome.bookingSearch || {})
            },
            featuredCollection: {
                ...defaultPagesData.home.featuredCollection,
                ...(existingHome.featuredCollection || {})
            }
          };
        }

        // Migrate destinations to ensure they have the new 'details' object format
        if (parsed.home && parsed.home.featuredCollection && parsed.home.featuredCollection.destinations) {
          parsed.home.featuredCollection.destinations = parsed.home.featuredCollection.destinations.map(dest => {
            const oldDetails = dest.details || {};
            // Always upgrade/merge the schema to the latest structure to ensure no missing fields
            return {
              ...dest,
              details: {
                hero: {
                  bgImage: oldDetails.hero?.bgImage || dest.image,
                  pageLabel: oldDetails.hero?.pageLabel || "Destination",
                  title: oldDetails.hero?.title || dest.name,
                  description: oldDetails.hero?.description || oldDetails.description || dest.description,
                  backButtonText: oldDetails.hero?.backButtonText || "Back",
                  ctaButtonText: oldDetails.hero?.ctaButtonText || "Explore Options",
                  ctaButtonLink: oldDetails.hero?.ctaButtonLink || "#"
                },
                topHighlights: {
                  sectionTitle: oldDetails.topHighlights?.sectionTitle || "Top Highlights",
                  items: oldDetails.topHighlights?.items || 
                         (Array.isArray(oldDetails.highlights) ? oldDetails.highlights.map(h => ({ name: h, icon: "CheckCircle" })) : [])
                },
                hotelsList: {
                  sectionTitle: oldDetails.hotelsList?.sectionTitle || oldDetails.hotelsList?.title || `Hotels in ${dest.name}`,
                  totalBadge: oldDetails.hotelsList?.totalBadge || `${dest.hotelsCount || 0} Properties`,
                  items: oldDetails.hotelsList?.items || []
                },
                ctaBox: {
                  title: oldDetails.ctaBox?.title || "Ready to explore?",
                  description: oldDetails.ctaBox?.description || oldDetails.ctaBox?.subtitle || `Book your stay in ${dest.name} today.`,
                  buttonText: oldDetails.ctaBox?.buttonText || "Search Availability",
                  buttonLink: oldDetails.ctaBox?.buttonLink || dest.buttonLink || "/search-results"
                },
                gallery: {
                  items: oldDetails.gallery?.items || 
                         (Array.isArray(oldDetails.gallery) ? oldDetails.gallery.map(img => ({ image: img, title: '' })) : [])
                },
                attractions: {
                  items: oldDetails.attractions?.items || oldDetails.nearbyAttractions || []
                },
                travelInfo: {
                  bestTimeToVisit: oldDetails.travelInfo?.bestTimeToVisit || "",
                  weather: oldDetails.travelInfo?.weather || "",
                  transportation: oldDetails.travelInfo?.transportation || "",
                  localTips: oldDetails.travelInfo?.localTips || ""
                },
                seo: {
                  slug: oldDetails.seo?.slug || dest.slug || dest.id,
                  metaTitle: oldDetails.seo?.metaTitle || dest.name,
                  metaDescription: oldDetails.seo?.metaDescription || dest.description,
                  featuredImage: oldDetails.seo?.featuredImage || dest.image,
                  status: oldDetails.seo?.status || "Published"
                }
              }
            };
          });
        }

        // Force layout update if they have the old layout where hero is before bookingSearch
        if (parsed.home && parsed.home.layout && parsed.home.layout[0] === 'hero' && parsed.home.layout[1] === 'bookingSearch') {
           parsed.home.layout = defaultPagesData.home.layout;
        }
        
        return parsed;
      } catch (e) {
        console.error("Failed to parse pages data", e);
      }
    }
    return defaultPagesData;
  });

  // Save to localStorage whenever pagesData changes
  useEffect(() => {
    localStorage.setItem('havenPagesData', JSON.stringify(pagesData));
  }, [pagesData]);

  // Update a specific field for a specific page/section
  const updatePageData = (pageId, sectionId, field, value) => {
    setPagesData(prev => {
      // If it's a nested section (like home -> hero)
      if (sectionId) {
        return {
          ...prev,
          [pageId]: {
            ...prev[pageId],
            [sectionId]: {
              ...prev[pageId][sectionId],
              [field]: value
            }
          }
        };
      }
      
      // If it's a flat structure (like contact -> title)
      return {
        ...prev,
        [pageId]: {
          ...prev[pageId],
          [field]: value
        }
      };
    });
  };

  return (
    <PageContext.Provider value={{ pagesData, updatePageData }}>
      {children}
    </PageContext.Provider>
  );
}

export const usePageContext = () => useContext(PageContext);
