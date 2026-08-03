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
        { id: 7, label: "Gallery", link: "/gallery" },
        { id: 2, label: "Offers", link: "/offers" },
        { id: 3, label: "Rooms", link: "/rooms" },
        { id: 4, label: "Facilities", link: "/facility" },
        { id: 5, label: "Locations", link: "/locations" },
        { id: 6, label: "Contact", link: "/contact" }
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
            facilities: {
              isVisible: true,
              sectionTitle: "Premium Hotel Facilities",
              badgeText: "Amenities",
              sectionSubtitle: "Experience world-class comfort with our premium facilities available at most properties in this destination.",
              items: [
                { id: "fac-1", name: "High-Speed WiFi", desc: "Stay connected with complimentary high-speed fiber internet in all rooms and public areas.", gradient: "linear-gradient(135deg, #6366f1, #8b5cf6)", icon: "Wifi", status: "Active", displayOrder: 1 },
                { id: "fac-2", name: "Infinity Pool", desc: "Relax in temperature-controlled infinity pools with panoramic views.", gradient: "linear-gradient(135deg, #0ea5e9, #6366f1)", icon: "Waves", status: "Active", displayOrder: 2 },
                { id: "fac-3", name: "Modern Fitness Center", desc: "Fully equipped 24-hour gym with state-of-the-art equipment.", gradient: "linear-gradient(135deg, #f59e0b, #d97706)", icon: "Dumbbell", status: "Active", displayOrder: 3 },
                { id: "fac-4", name: "24/7 Room Service", desc: "Enjoy gourmet meals delivered right to your door anytime.", gradient: "linear-gradient(135deg, #ec4899, #f43f5e)", icon: "Utensils", status: "Active", displayOrder: 4 }
              ]
            },
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
            facilities: {
              isVisible: true,
              sectionTitle: "Premium Hotel Facilities",
              badgeText: "Amenities",
              sectionSubtitle: "Experience world-class comfort with our premium facilities available at most properties in this destination.",
              items: [
                { id: "fac-1", name: "High-Speed WiFi", desc: "Stay connected with complimentary high-speed fiber internet in all rooms and public areas.", gradient: "linear-gradient(135deg, #6366f1, #8b5cf6)", icon: "Wifi", status: "Active", displayOrder: 1 },
                { id: "fac-2", name: "Infinity Pool", desc: "Relax in temperature-controlled infinity pools with panoramic views.", gradient: "linear-gradient(135deg, #0ea5e9, #6366f1)", icon: "Waves", status: "Active", displayOrder: 2 },
                { id: "fac-3", name: "Modern Fitness Center", desc: "Fully equipped 24-hour gym with state-of-the-art equipment.", gradient: "linear-gradient(135deg, #f59e0b, #d97706)", icon: "Dumbbell", status: "Active", displayOrder: 3 },
                { id: "fac-4", name: "24/7 Room Service", desc: "Enjoy gourmet meals delivered right to your door anytime.", gradient: "linear-gradient(135deg, #ec4899, #f43f5e)", icon: "Utensils", status: "Active", displayOrder: 4 }
              ]
            },
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
            facilities: {
              isVisible: true,
              sectionTitle: "Premium Hotel Facilities",
              badgeText: "Amenities",
              sectionSubtitle: "Experience world-class comfort with our premium facilities available at most properties in this destination.",
              items: [
                { id: "fac-1", name: "High-Speed WiFi", desc: "Stay connected with complimentary high-speed fiber internet in all rooms and public areas.", gradient: "linear-gradient(135deg, #6366f1, #8b5cf6)", icon: "Wifi", status: "Active", displayOrder: 1 },
                { id: "fac-2", name: "Infinity Pool", desc: "Relax in temperature-controlled infinity pools with panoramic views.", gradient: "linear-gradient(135deg, #0ea5e9, #6366f1)", icon: "Waves", status: "Active", displayOrder: 2 },
                { id: "fac-3", name: "Modern Fitness Center", desc: "Fully equipped 24-hour gym with state-of-the-art equipment.", gradient: "linear-gradient(135deg, #f59e0b, #d97706)", icon: "Dumbbell", status: "Active", displayOrder: 3 },
                { id: "fac-4", name: "24/7 Room Service", desc: "Enjoy gourmet meals delivered right to your door anytime.", gradient: "linear-gradient(135deg, #ec4899, #f43f5e)", icon: "Utensils", status: "Active", displayOrder: 4 }
              ]
            },
            seo: { slug: "sylhet", metaTitle: "Sylhet Tea Gardens & Tourism", metaDescription: "Discover the natural beauty of Sylhet.", featuredImage: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80", status: "Published" }
          }
        }
      ]
    },
    curatedCollection: { title: "Curated Rooms" },
    aiSection: { title: "AI Assistant" },
    curatedDestinations: { title: "Explore Destinations", description: "Our Curated Destinations" },
    facilities: { 
      isVisible: true,
      badgeText: "Premium Amenities",
      title: "Hotel",
      titleHighlight: "Facilities",
      subtitle: "Enjoy world-class amenities for a comfortable stay — every detail considered, every comfort included.",
      items: [
        { id: "fac-1", name: "Free WiFi", desc: "High-speed fibre internet everywhere", gradient: "linear-gradient(135deg, #6366f1, #8b5cf6)", icon: "Wifi", status: "Active", displayOrder: 1 },
        { id: "fac-2", name: "Swimming Pool", desc: "Heated infinity pool with skyline views", gradient: "linear-gradient(135deg, #0ea5e9, #6366f1)", icon: "Waves", status: "Active", displayOrder: 2 },
        { id: "fac-3", name: "Fitness Center", desc: "24-hour gym with personal trainers", gradient: "linear-gradient(135deg, #f59e0b, #d97706)", icon: "Dumbbell", status: "Active", displayOrder: 3 },
        { id: "fac-4", name: "Valet Parking", desc: "Secure on-site parking & valet service", gradient: "linear-gradient(135deg, #14b8a6, #0ea5e9)", icon: "Car", status: "Active", displayOrder: 4 },
        { id: "fac-5", name: "Room Service", desc: "In-room dining around the clock", gradient: "linear-gradient(135deg, #ec4899, #f43f5e)", icon: "Utensils", status: "Active", displayOrder: 5 },
        { id: "fac-6", name: "Gourmet Breakfast", desc: "Fresh, locally-sourced morning buffet", gradient: "linear-gradient(135deg, #f97316, #f59e0b)", icon: "Coffee", status: "Active", displayOrder: 6 },
        { id: "fac-7", name: "24/7 Reception", desc: "Always-on concierge & front desk", gradient: "linear-gradient(135deg, #8b5cf6, #6366f1)", icon: "Clock", status: "Active", displayOrder: 7 }
      ]
    },
    reviews: { 
      isVisible: true,
      badgeText: "Guest Stories",
      title: "What Our",
      titleHighlight: "Guests Say",
      subtitle: "Real experiences from our happy guests around the world.",
      items: [
        { id: "rev-1", name: "Sophia Bennett", location: "London, United Kingdom", rating: 5, review: "An absolutely stunning property. From the moment we arrived, the staff anticipated every need. The infinity pool and spa were the highlight of our trip — we'll be back.", initials: "SB", color: "linear-gradient(135deg, #f59e0b, #6366f1)", status: "Active", displayOrder: 1 },
        { id: "rev-2", name: "Daniel Mensah", location: "Accra, Ghana", rating: 5, review: "Service was impeccable and the rooms exceeded expectations. The breakfast spread alone is worth the stay. Highly recommend the Ocean Suite for the views.", initials: "DM", color: "linear-gradient(135deg, #0ea5e9, #f59e0b)", status: "Active", displayOrder: 2 },
        { id: "rev-3", name: "Aiko Tanaka", location: "Tokyo, Japan", rating: 4.5, review: "Beautifully designed, peaceful, and quiet despite being in the city center. The concierge helped plan our entire itinerary — truly five-star hospitality.", initials: "AT", color: "linear-gradient(135deg, #6366f1, #8b5cf6)", status: "Active", displayOrder: 3 },
        { id: "rev-4", name: "Lucas Martin", location: "Paris, France", rating: 5, review: "We celebrated our anniversary here and it was magical. The presidential suite, the private dining experience, everything felt curated just for us.", initials: "LM", color: "linear-gradient(135deg, #14b8a6, #f59e0b)", status: "Active", displayOrder: 4 },
        { id: "rev-5", name: "Priya Sharma", location: "Mumbai, India", rating: 4.5, review: "Exceptional attention to detail. The spa treatments were rejuvenating and the staff went above and beyond to make our family feel at home.", initials: "PS", color: "linear-gradient(135deg, #f59e0b, #0ea5e9)", status: "Active", displayOrder: 5 },
        { id: "rev-6", name: "Ethan Walker", location: "Sydney, Australia", rating: 5, review: "Best hotel experience we've had in years. Clean, modern, luxurious — and the staff remembered our names from day one. Can't recommend it enough.", initials: "EW", color: "linear-gradient(135deg, #8b5cf6, #f59e0b)", status: "Active", displayOrder: 6 },
      ]
    },
    statistics: {
      isVisible: true,
      badgeText: "Trusted Worldwide",
      title: "Numbers That Speak",
      titleHighlight: "For Themselves",
      items: [
        { id: "stat-1", icon: "Users", value: "25,000", suffix: "+", label: "Happy Guests", status: "Active", displayOrder: 1 },
        { id: "stat-2", icon: "Award", value: "4.9", suffix: " / 5", label: "5-Star Reviews", status: "Active", displayOrder: 2 },
        { id: "stat-3", icon: "Repeat", value: "68", suffix: "%", label: "Repeat Customers", status: "Active", displayOrder: 3 },
        { id: "stat-4", icon: "Globe", value: "80", suffix: "+", label: "Global Visitors", status: "Active", displayOrder: 4 },
      ]
    },
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
            },
            facilities: {
                ...defaultPagesData.home.facilities,
                ...(existingHome.facilities || {})
            }
          };
        }

        // Migrate navMenu if it lacks Offers (for older saved versions)
        if (parsed.home && parsed.home.navbar && parsed.home.navbar.navMenu) {
            const hasOffers = parsed.home.navbar.navMenu.some(item => item.link === '/offers' || item.label === 'Offers');
            if (!hasOffers) {
                // If it's exactly the old default, replace it with the new default
                const isOldDefault = parsed.home.navbar.navMenu.length === 4 && parsed.home.navbar.navMenu[1].label === 'Hotels';
                if (isOldDefault) {
                    parsed.home.navbar.navMenu = defaultPagesData.home.navbar.navMenu;
                } else {
                    // Otherwise just append Offers
                    const newId = parsed.home.navbar.navMenu.length > 0 ? Math.max(...parsed.home.navbar.navMenu.map(i => i.id)) + 1 : 1;
                    parsed.home.navbar.navMenu.push({ id: newId, label: 'Offers', link: '/offers' });
                }
            }

            // Also migrate Locations and Contact if they are missing
            const hasLocations = parsed.home.navbar.navMenu.some(item => item.link === '/locations' || item.label === 'Locations');
            if (!hasLocations) {
                const newId = parsed.home.navbar.navMenu.length > 0 ? Math.max(...parsed.home.navbar.navMenu.map(i => i.id)) + 1 : 1;
                parsed.home.navbar.navMenu.push({ id: newId, label: 'Locations', link: '/locations' });
            }

            const hasContact = parsed.home.navbar.navMenu.some(item => item.link === '/contact' || item.label === 'Contact');
            if (!hasContact) {
                const newId = parsed.home.navbar.navMenu.length > 0 ? Math.max(...parsed.home.navbar.navMenu.map(i => i.id)) + 1 : 1;
                parsed.home.navbar.navMenu.push({ id: newId, label: 'Contact', link: '/contact' });
            }

            // Ensure "Home" is removed from navMenu for all existing users
            parsed.home.navbar.navMenu = parsed.home.navbar.navMenu.filter(
                item => item.label.toLowerCase() !== 'home' && item.link !== '/'
            );
            
            // Also migrate Gallery to be before Offers if it doesn't exist
            const hasGallery = parsed.home.navbar.navMenu.some(item => item.link === '/gallery' || item.label === 'Gallery');
            if (!hasGallery) {
                const newId = parsed.home.navbar.navMenu.length > 0 ? Math.max(...parsed.home.navbar.navMenu.map(i => i.id)) + 1 : 1;
                const galleryItem = { id: newId, label: 'Gallery', link: '/gallery' };
                const offersIndex = parsed.home.navbar.navMenu.findIndex(item => item.label === 'Offers' || item.link === '/offers');
                if (offersIndex !== -1) {
                    parsed.home.navbar.navMenu.splice(offersIndex, 0, galleryItem);
                } else {
                    parsed.home.navbar.navMenu.unshift(galleryItem);
                }
            }
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
                facilities: oldDetails.facilities || {
                  isVisible: true,
                  sectionTitle: "Premium Hotel Facilities",
                  badgeText: "Amenities",
                  sectionSubtitle: "Experience world-class comfort with our premium facilities available at most properties in this destination.",
                  items: [
                    { id: "fac-1", name: "High-Speed WiFi", desc: "Stay connected with complimentary high-speed fiber internet in all rooms and public areas.", gradient: "linear-gradient(135deg, #6366f1, #8b5cf6)", icon: "Wifi", status: "Active", displayOrder: 1 },
                    { id: "fac-2", name: "Infinity Pool", desc: "Relax in temperature-controlled infinity pools with panoramic views.", gradient: "linear-gradient(135deg, #0ea5e9, #6366f1)", icon: "Waves", status: "Active", displayOrder: 2 },
                    { id: "fac-3", name: "Modern Fitness Center", desc: "Fully equipped 24-hour gym with state-of-the-art equipment.", gradient: "linear-gradient(135deg, #f59e0b, #d97706)", icon: "Dumbbell", status: "Active", displayOrder: 3 },
                    { id: "fac-4", name: "24/7 Room Service", desc: "Enjoy gourmet meals delivered right to your door anytime.", gradient: "linear-gradient(135deg, #ec4899, #f43f5e)", icon: "Utensils", status: "Active", displayOrder: 4 }
                  ]
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
