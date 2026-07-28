// export const hotelDetailsData = [
//   {
//     id: 1,
//     name: "The Grand Aurum Palace",
//     location: "Gulshan-1, Dhaka, Bangladesh",
//     description:
//       "The Grand Aurum Palace is Dhaka's most iconic five-star destination, offering an unparalleled fusion of classical architecture and contemporary luxury. Perched at the heart of the capital, every detail — from the hand-stitched silk drapes to the Italian marble lobbies — has been thoughtfully curated for the most discerning travellers. Our award-winning culinary team crafts menus inspired by global flavours, while the full-service spa delivers bespoke wellness journeys. Whether you're visiting for business or leisure, expect nothing short of extraordinary.",
//     gallery: [
//       "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
//       "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=75",
//       "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=75",
//       "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?auto=format&fit=crop&w=800&q=75",
//       "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=75",
//     ],
//     stars: 5,
//     guestRating: 9.4,
//     ratingLabel: "Exceptional",
//     reviewCount: 2847,
//     facilities: ["wifi", "pool", "spa", "gym", "parking", "restaurant"],
//     rooms: [
//       {
//         id: 101,
//         roomName: "Deluxe King Room",
//         image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=600&q=75",
//         bedType: "1 King Bed",
//         guests: 2,
//         size: "42 m²",
//         price: 320,
//         breakfast: true,
//         freeCancellation: true,
//       },
//       {
//         id: 102,
//         roomName: "Premier Ocean Suite",
//         image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=75",
//         bedType: "1 King Bed + Sofa",
//         guests: 3,
//         size: "68 m²",
//         price: 480,
//         breakfast: true,
//         freeCancellation: false,
//       },
//       {
//         id: 103,
//         roomName: "Classic Twin Room",
//         image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=75",
//         bedType: "2 Twin Beds",
//         guests: 2,
//         size: "38 m²",
//         price: 260,
//         breakfast: false,
//         freeCancellation: true,
//       },
//     ],
//     policies: {
//       checkIn: "3:00 PM",
//       checkOut: "12:00 PM",
//       cancellationPolicy:
//         "Free cancellation up to 48 hours before check-in. Late cancellations or no-shows are charged 100% of the first night.",
//     },
//     reviews: [
//       { user: "Sophia B.", rating: 10, comment: "Absolutely flawless — the staff went above and beyond. The infinity pool alone is worth the trip." },
//       { user: "Luca M.", rating: 9, comment: "Stunning property in the heart of Dhaka. Breakfast was exceptional and the spa was deeply relaxing." },
//       { user: "Aiko T.", rating: 9, comment: "Impeccable service, beautifully designed rooms. Will definitely return on my next visit." },
//     ],
//   },
//   {
//     id: 2,
//     name: "Skyline Boutique Hotel",
//     location: "Banani, Dhaka, Bangladesh",
//     description:
//       "Skyline Boutique Hotel is a chic urban retreat nestled in Dhaka's vibrant Banani district. Our contemporary design blends raw industrial elements with warm accents, creating spaces that feel both creative and comfortable. The rooftop terrace offers 360-degree views of the city skyline — perfect for sunset cocktails. With a curated selection of local and international artwork throughout, every corridor tells a story. Ideal for the modern traveller who values design, connectivity, and an authentic local experience.",
//     gallery: [
//       "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
//       "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=75",
//       "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=75",
//       "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?auto=format&fit=crop&w=800&q=75",
//       "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=75",
//     ],
//     stars: 4,
//     guestRating: 8.7,
//     ratingLabel: "Excellent",
//     reviewCount: 1423,
//     facilities: ["wifi", "gym", "parking"],
//     rooms: [
//       {
//         id: 201,
//         roomName: "Skyline Standard Room",
//         image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=75",
//         bedType: "1 Queen Bed",
//         guests: 2,
//         size: "30 m²",
//         price: 195,
//         breakfast: false,
//         freeCancellation: true,
//       },
//       {
//         id: 202,
//         roomName: "Rooftop Terrace Suite",
//         image: "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?auto=format&fit=crop&w=600&q=75",
//         bedType: "1 King Bed",
//         guests: 2,
//         size: "52 m²",
//         price: 310,
//         breakfast: true,
//         freeCancellation: true,
//       },
//     ],
//     policies: {
//       checkIn: "2:00 PM",
//       checkOut: "11:00 AM",
//       cancellationPolicy:
//         "Free cancellation up to 24 hours before check-in. After that, 50% of the total stay is charged.",
//     },
//     reviews: [
//       { user: "Daniel K.", rating: 9, comment: "The rooftop view at night is unbeatable. Staff were super friendly and helpful." },
//       { user: "Priya S.", rating: 8, comment: "Great location, stylish rooms. Would have loved a pool, but overall a great stay." },
//     ],
//   },
//   {
//     id: 3,
//     name: "Azure Sea Resort & Spa",
//     location: "Cox's Bazar, Bangladesh",
//     description:
//       "Azure Sea Resort & Spa stretches along the world's longest natural sea beach, offering a rare blend of coastal serenity and five-star luxury. Guests wake to the sound of waves and panoramic ocean views from private balconies. Our award-winning Aqua Spa draws from ancient Ayurvedic traditions, while the beachfront infinity pool creates a seamless visual merger with the sea beyond. Three speciality restaurants cater to every palate, from fresh seafood caught that morning to refined international cuisine.",
//     gallery: [
//       "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
//       "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=75",
//       "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=75",
//       "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=75",
//       "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=75",
//     ],
//     stars: 5,
//     guestRating: 9.1,
//     ratingLabel: "Exceptional",
//     reviewCount: 3102,
//     facilities: ["wifi", "pool", "spa", "restaurant", "gym"],
//     rooms: [
//       {
//         id: 301,
//         roomName: "Oceanfront Family Suite",
//         image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=600&q=75",
//         bedType: "1 King + 2 Twin Beds",
//         guests: 4,
//         size: "85 m²",
//         price: 450,
//         breakfast: true,
//         freeCancellation: false,
//       },
//       {
//         id: 302,
//         roomName: "Beachview Deluxe Room",
//         image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=600&q=75",
//         bedType: "1 King Bed",
//         guests: 2,
//         size: "48 m²",
//         price: 360,
//         breakfast: true,
//         freeCancellation: true,
//       },
//     ],
//     policies: {
//       checkIn: "3:00 PM",
//       checkOut: "12:00 PM",
//       cancellationPolicy:
//         "Non-refundable rate. No cancellations accepted after booking is confirmed.",
//     },
//     reviews: [
//       { user: "Ethan W.", rating: 10, comment: "The most beautiful resort I've ever stayed at. Waking up to the ocean every morning was magical." },
//       { user: "Aiko T.", rating: 9, comment: "Spa was phenomenal. The Ayurvedic treatment left me completely rejuvenated." },
//       { user: "Lucas M.", rating: 9, comment: "Family loved it. The kids' pool area and the beach access made it perfect for us." },
//     ],
//   },
//   {
//     id: 4,
//     name: "Metropolitan Business Inn",
//     location: "Motijheel, Dhaka, Bangladesh",
//     description:
//       "Metropolitan Business Inn is Dhaka's go-to address for the corporate traveller seeking smart comfort at an accessible price. Located in the commercial heart of Motijheel, our hotel places you steps from the city's key financial institutions and government offices. Rooms are compact yet thoughtfully designed with ergonomic workstations, blackout curtains, and ultra-fast WiFi. Our complimentary breakfast buffet ensures you start every day fuelled and focused.",
//     gallery: [
//       "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
//       "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=75",
//       "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=75",
//       "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=75",
//       "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?auto=format&fit=crop&w=800&q=75",
//     ],
//     stars: 3,
//     guestRating: 7.8,
//     ratingLabel: "Good",
//     reviewCount: 892,
//     facilities: ["wifi", "parking"],
//     rooms: [
//       {
//         id: 401,
//         roomName: "Standard Single Room",
//         image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=75",
//         bedType: "1 Single Bed",
//         guests: 1,
//         size: "22 m²",
//         price: 75,
//         breakfast: true,
//         freeCancellation: true,
//       },
//       {
//         id: 402,
//         roomName: "Business Double Room",
//         image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=600&q=75",
//         bedType: "1 Double Bed",
//         guests: 2,
//         size: "30 m²",
//         price: 95,
//         breakfast: true,
//         freeCancellation: true,
//       },
//     ],
//     policies: {
//       checkIn: "2:00 PM",
//       checkOut: "12:00 PM",
//       cancellationPolicy:
//         "Free cancellation up to 48 hours before check-in. After that, 1 night's charge applies.",
//     },
//     reviews: [
//       { user: "Ravi P.", rating: 8, comment: "Clean, well located, and the breakfast was surprisingly good. Great value." },
//       { user: "Sarah L.", rating: 7, comment: "Functional and comfortable for a business trip. Nothing fancy but does the job well." },
//     ],
//   },
//   {
//     id: 5,
//     name: "The Diplomat Residence",
//     location: "Baridhara, Dhaka, Bangladesh",
//     description:
//       "The Diplomat Residence stands as Dhaka's most prestigious address, catering exclusively to heads of state, senior executives, and celebrities seeking absolute privacy and maximum sophistication. Every suite features bespoke furniture crafted by local artisans, a private dining area, and a dedicated butler available 24 hours. The wine cellar, curated by a master sommelier, houses over 800 labels. Security, discretion, and flawless service define every moment of your stay.",
//     gallery: [
//       "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80",
//       "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=75",
//       "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=75",
//       "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=75",
//       "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?auto=format&fit=crop&w=800&q=75",
//     ],
//     stars: 5,
//     guestRating: 9.6,
//     ratingLabel: "Exceptional",
//     reviewCount: 4201,
//     facilities: ["wifi", "pool", "spa", "gym", "restaurant", "parking"],
//     rooms: [
//       {
//         id: 501,
//         roomName: "Presidential Suite",
//         image: "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?auto=format&fit=crop&w=600&q=75",
//         bedType: "1 Super King Bed",
//         guests: 2,
//         size: "180 m²",
//         price: 680,
//         breakfast: true,
//         freeCancellation: true,
//       },
//       {
//         id: 502,
//         roomName: "Ambassador Suite",
//         image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=600&q=75",
//         bedType: "1 King Bed",
//         guests: 2,
//         size: "110 m²",
//         price: 520,
//         breakfast: true,
//         freeCancellation: true,
//       },
//     ],
//     policies: {
//       checkIn: "4:00 PM",
//       checkOut: "1:00 PM",
//       cancellationPolicy:
//         "Free cancellation up to 72 hours before check-in. Within 72 hours, 100% of total stay is charged.",
//     },
//     reviews: [
//       { user: "James A.", rating: 10, comment: "The finest hotel experience of my life. The butler service was seamlessly anticipatory." },
//       { user: "Yuki T.", rating: 10, comment: "Absolute perfection. Every detail attended to without being asked. The definition of luxury." },
//       { user: "Olivia R.", rating: 9, comment: "Breathtaking property. The wine cellar dinner was the highlight of our trip to Dhaka." },
//     ],
//   },
//   {
//     id: 6,
//     name: "Garden View Suites",
//     location: "Dhanmondi, Dhaka, Bangladesh",
//     description:
//       "Garden View Suites is a serene haven tucked into the leafy residential calm of Dhanmondi. Designed around a lush central courtyard garden, our suites open directly onto private verandahs overlooking manicured greenery — a rare luxury in urban Dhaka. We cater to families, long-stay guests, and those who prefer space over spectacle. A heated outdoor pool, a warm restaurant serving Bangladeshi and international comfort food, and our attentive family-first service make Garden View Suites a home away from home.",
//     gallery: [
//       "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80",
//       "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=75",
//       "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=75",
//       "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=75",
//       "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=75",
//     ],
//     stars: 4,
//     guestRating: 8.2,
//     ratingLabel: "Very Good",
//     reviewCount: 1105,
//     facilities: ["wifi", "pool", "parking", "restaurant"],
//     rooms: [
//       {
//         id: 601,
//         roomName: "Garden Deluxe Suite",
//         image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=600&q=75",
//         bedType: "1 King Bed",
//         guests: 2,
//         size: "55 m²",
//         price: 155,
//         breakfast: true,
//         freeCancellation: true,
//       },
//       {
//         id: 602,
//         roomName: "Family Garden Suite",
//         image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=600&q=75",
//         bedType: "1 King + 1 Bunk Bed",
//         guests: 4,
//         size: "78 m²",
//         price: 210,
//         breakfast: true,
//         freeCancellation: true,
//       },
//     ],
//     policies: {
//       checkIn: "2:00 PM",
//       checkOut: "12:00 PM",
//       cancellationPolicy:
//         "Free cancellation up to 48 hours before check-in. Partial charge applies for late cancellations.",
//     },
//     reviews: [
//       { user: "Mei L.", rating: 8, comment: "Such a peaceful property! The garden is beautiful and the kids loved the pool." },
//       { user: "Carlos R.", rating: 8, comment: "Great for families. Lots of space, friendly staff and the food is home-cooked quality." },
//     ],
//   },
//   {
//     id: 7,
//     name: "Harbour Lights Hotel",
//     location: "Old Dhaka, Bangladesh",
//     description:
//       "Harbour Lights Hotel occupies a lovingly restored colonial-era building on the banks of the Buriganga River. The property marries heritage architecture with modern comforts — original wooden beams and terracotta tile floors coexist with pillow-top mattresses and rain showers. Our rooftop restaurant is celebrated for its evening river views and fresh water-to-table seafood menu. Walking tours of Old Dhaka's Mughal-era mosques, spice markets, and river ghats depart from our front door.",
//     gallery: [
//       "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200&q=80",
//       "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=75",
//       "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=75",
//       "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=75",
//       "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=75",
//     ],
//     stars: 4,
//     guestRating: 8.5,
//     ratingLabel: "Excellent",
//     reviewCount: 978,
//     facilities: ["wifi", "gym", "restaurant"],
//     rooms: [
//       {
//         id: 701,
//         roomName: "Heritage River View Room",
//         image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=600&q=75",
//         bedType: "1 Queen Bed",
//         guests: 2,
//         size: "35 m²",
//         price: 210,
//         breakfast: false,
//         freeCancellation: false,
//       },
//       {
//         id: 702,
//         roomName: "Colonial Courtyard Suite",
//         image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=75",
//         bedType: "1 King Bed",
//         guests: 2,
//         size: "50 m²",
//         price: 290,
//         breakfast: false,
//         freeCancellation: false,
//       },
//     ],
//     policies: {
//       checkIn: "3:00 PM",
//       checkOut: "11:00 AM",
//       cancellationPolicy:
//         "Non-refundable. Modifications are subject to availability and may incur fees.",
//     },
//     reviews: [
//       { user: "Tom B.", rating: 9, comment: "So much character! The history of this building adds so much to the experience." },
//       { user: "Fatima A.", rating: 8, comment: "The rooftop dinner over the river was unforgettable. Unique hotel in a unique setting." },
//     ],
//   },
//   {
//     id: 8,
//     name: "Prestige Penthouse Hotel",
//     location: "Uttara, Dhaka, Bangladesh",
//     description:
//       "Prestige Penthouse Hotel redefines the concept of sky-high living in Dhaka. Our 42-floor tower hosts only 60 exclusive suites, each spanning an entire floor segment with unobstructed panoramic views of the city. The crown jewel is the 40th-floor infinity pool that appears to float among the clouds. Our Michelin-inspired restaurant, Altitude, serves a 7-course tasting menu that changes monthly. For families, the supervised kids' adventure zone and family spa treatment rooms offer experiences as lavish for the young as the adults.",
//     gallery: [
//       "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?auto=format&fit=crop&w=1200&q=80",
//       "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=75",
//       "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=75",
//       "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=75",
//       "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=75",
//     ],
//     stars: 5,
//     guestRating: 9.3,
//     ratingLabel: "Exceptional",
//     reviewCount: 2210,
//     facilities: ["wifi", "pool", "spa", "gym", "restaurant", "parking"],
//     rooms: [
//       {
//         id: 801,
//         roomName: "Sky Penthouse Suite",
//         image: "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?auto=format&fit=crop&w=600&q=75",
//         bedType: "1 Super King Bed",
//         guests: 2,
//         size: "150 m²",
//         price: 520,
//         breakfast: true,
//         freeCancellation: true,
//       },
//       {
//         id: 802,
//         roomName: "Family Panorama Suite",
//         image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=600&q=75",
//         bedType: "1 King + 2 Twin Beds",
//         guests: 4,
//         size: "200 m²",
//         price: 680,
//         breakfast: true,
//         freeCancellation: true,
//       },
//       {
//         id: 803,
//         roomName: "Cloud View Double",
//         image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=75",
//         bedType: "1 King Bed",
//         guests: 2,
//         size: "65 m²",
//         price: 380,
//         breakfast: false,
//         freeCancellation: true,
//       },
//     ],
//     policies: {
//       checkIn: "3:00 PM",
//       checkOut: "12:00 PM",
//       cancellationPolicy:
//         "Free cancellation up to 72 hours before check-in. Within 72 hours, 100% of stay is charged.",
//     },
//     reviews: [
//       { user: "Yuki T.", rating: 10, comment: "The infinity pool on the 40th floor is the most dramatic thing I've ever seen. Absolutely stunning." },
//       { user: "Marco V.", rating: 9, comment: "Altitude restaurant's tasting menu was a culinary journey. The views made it even more special." },
//       { user: "Hannah C.", rating: 9, comment: "Perfect for our family trip. The kids' zone kept the little ones happy while we relaxed at the spa." },
//     ],
//   },
// ];

// export default hotelDetailsData;
export const hotelDetailsData = [
  {
    "id": 1,
    "name": "The Grand Aurum Palace",
    "location": "Gulshan-1, Dhaka, Bangladesh",
    "description": "The Grand Aurum Palace is Dhaka's most iconic five-star destination, offering an unparalleled fusion of classical architecture and contemporary luxury. Perched at the heart of the capital, every detail — from the hand-stitched silk drapes to the Italian marble lobbies — has been thoughtfully curated for the most discerning travellers. Our award-winning culinary team crafts menus inspired by global flavours, while the full-service spa delivers bespoke wellness journeys. Whether you're visiting for business or leisure, expect nothing short of extraordinary.",
    "gallery": [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=75",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=75",
      "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?auto=format&fit=crop&w=800&q=75",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=75"
    ],
    "stars": 5,
    "guestRating": 9.4,
    "ratingLabel": "Exceptional",
    "reviewCount": 2847,
    "facilities": [
      "wifi",
      "pool",
      "spa",
      "gym",
      "parking",
      "restaurant"
    ],
    "policies": {
      "checkIn": "3:00 PM",
      "checkOut": "12:00 PM",
      "cancellationPolicy": "Free cancellation up to 48 hours before check-in. Late cancellations or no-shows are charged 100% of the first night."
    },
    "reviews": [
      {
        "user": "Sophia B.",
        "rating": 10,
        "comment": "Absolutely flawless — the staff went above and beyond. The infinity pool alone is worth the trip."
      },
      {
        "user": "Luca M.",
        "rating": 9,
        "comment": "Stunning property in the heart of Dhaka. Breakfast was exceptional and the spa was deeply relaxing."
      },
      {
        "user": "Aiko T.",
        "rating": 9,
        "comment": "Impeccable service, beautifully designed rooms. Will definitely return on my next visit."
      }
    ],
    "rooms": [
      {
        "hotelId": 1,
        "name": "Deluxe King Room",
        "id": 101,
        "roomType": "Deluxe Room",
        "description": "A spacious room with floor-to-ceiling windows overlooking the cityscape. Features premium Italian marble bathroom, walk-in wardrobe, and a dedicated work desk.",
        "image": "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=600&q=75",
        "gallery": [
          "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=75",
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=75"
        ],
        "price": 320,
        "originalPrice": 420,
        "discountPrice": 320,
        "availability": true,
        "availableRooms": 3,
        "maxGuests": 2,
        "bedType": "1 King Bed",
        "roomSize": "42 m²",
        "breakfast": true,
        "freeCancellation": true,
        "badge": "Best Value",
        "badgeColor": "#0369a1",
        "facilities": [
          "wifi",
          "ac",
          "breakfast",
          "freeCancellation",
          "tv",
          "bathroom",
          "minibar",
          "coffee"
        ],
        "features": [
          "Free WiFi",
          "Air Conditioning",
          "Breakfast Included",
          "Free Cancellation",
          "Smart TV",
          "Private Bathroom",
          "Mini Bar",
          "Coffee Maker"
        ]
      },
      {
        "hotelId": 1,
        "name": "Premier Ocean Suite",
        "id": 102,
        "roomType": "Suite",
        "description": "An expansive suite with panoramic ocean views from a private wraparound terrace. Includes a separate lounge area, soaking tub, and butler service.",
        "image": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=75",
        "gallery": [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=75",
          "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?auto=format&fit=crop&w=800&q=75"
        ],
        "price": 480,
        "originalPrice": 600,
        "discountPrice": 480,
        "availability": true,
        "availableRooms": 2,
        "maxGuests": 3,
        "bedType": "1 King Bed + Sofa",
        "roomSize": "68 m²",
        "breakfast": true,
        "freeCancellation": false,
        "badge": "High Demand",
        "badgeColor": "#b45309",
        "facilities": [
          "wifi",
          "ac",
          "breakfast",
          "tv",
          "bathroom",
          "minibar",
          "coffee"
        ],
        "features": [
          "Free WiFi",
          "Air Conditioning",
          "Breakfast Included",
          "Smart TV",
          "Private Bathroom",
          "Mini Bar",
          "Coffee Maker"
        ]
      },
      {
        "hotelId": 1,
        "name": "Classic Twin Room",
        "id": 103,
        "roomType": "Twin Room",
        "description": "A well-appointed twin room ideal for colleagues or friends. Features two plush single beds, a compact work area, and a sleek ensuite bathroom.",
        "image": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=75",
        "gallery": [
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=75"
        ],
        "price": 260,
        "originalPrice": 320,
        "discountPrice": 260,
        "availability": true,
        "availableRooms": 5,
        "maxGuests": 2,
        "bedType": "2 Twin Beds",
        "roomSize": "38 m²",
        "breakfast": false,
        "freeCancellation": true,
        "badge": null,
        "badgeColor": null,
        "facilities": [
          "wifi",
          "ac",
          "freeCancellation",
          "tv",
          "bathroom",
          "coffee"
        ],
        "features": [
          "Free WiFi",
          "Air Conditioning",
          "Free Cancellation",
          "Smart TV",
          "Private Bathroom",
          "Coffee Maker"
        ]
      },
      {
        "hotelId": 1,
        "name": "Presidential Suite",
        "id": 104,
        "roomType": "Presidential Suite",
        "description": "The pinnacle of luxury — a full-floor private suite with wraparound terrace, in-suite spa, chef's kitchen, private dining room, and dedicated butler.",
        "image": "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?auto=format&fit=crop&w=600&q=75",
        "gallery": [
          "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?auto=format&fit=crop&w=800&q=75",
          "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=75"
        ],
        "price": 1200,
        "originalPrice": 1500,
        "discountPrice": 1200,
        "availability": true,
        "availableRooms": 1,
        "maxGuests": 4,
        "bedType": "1 Super King Bed",
        "roomSize": "180 m²",
        "breakfast": true,
        "freeCancellation": true,
        "badge": "Only 1 left",
        "badgeColor": "#dc2626",
        "facilities": [
          "wifi",
          "ac",
          "breakfast",
          "freeCancellation",
          "tv",
          "bathroom",
          "minibar",
          "coffee"
        ],
        "features": [
          "Free WiFi",
          "Air Conditioning",
          "Breakfast Included",
          "Free Cancellation",
          "Smart TV",
          "Private Bathroom",
          "Mini Bar",
          "Coffee Maker"
        ]
      }
    ]
  },
  {
    "id": 2,
    "name": "Skyline Boutique Hotel",
    "location": "Banani, Dhaka, Bangladesh",
    "description": "Skyline Boutique Hotel is a chic urban retreat nestled in Dhaka's vibrant Banani district. Our contemporary design blends raw industrial elements with warm accents, creating spaces that feel both creative and comfortable. The rooftop terrace offers 360-degree views of the city skyline — perfect for sunset cocktails. With a curated selection of local and international artwork throughout, every corridor tells a story. Ideal for the modern traveller who values design, connectivity, and an authentic local experience.",
    "gallery": [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=75",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=75",
      "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?auto=format&fit=crop&w=800&q=75",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=75"
    ],
    "stars": 4,
    "guestRating": 8.7,
    "ratingLabel": "Excellent",
    "reviewCount": 1423,
    "facilities": [
      "wifi",
      "gym",
      "parking"
    ],
    "policies": {
      "checkIn": "2:00 PM",
      "checkOut": "11:00 AM",
      "cancellationPolicy": "Free cancellation up to 24 hours before check-in. After that, 50% of the total stay is charged."
    },
    "reviews": [
      {
        "user": "Daniel K.",
        "rating": 9,
        "comment": "The rooftop view at night is unbeatable. Staff were super friendly and helpful."
      },
      {
        "user": "Priya S.",
        "rating": 8,
        "comment": "Great location, stylish rooms. Would have loved a pool, but overall a great stay."
      }
    ],
    "rooms": [
      {
        "hotelId": 2,
        "name": "Skyline Standard Room",
        "id": 201,
        "roomType": "Standard Room",
        "description": "A stylish room blending industrial chic with warm textiles. Perfect for solo travellers or couples seeking urban comfort.",
        "image": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=75",
        "gallery": [
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=75"
        ],
        "price": 195,
        "originalPrice": 240,
        "discountPrice": 195,
        "availability": true,
        "availableRooms": 4,
        "maxGuests": 2,
        "bedType": "1 Queen Bed",
        "roomSize": "30 m²",
        "breakfast": false,
        "freeCancellation": true,
        "badge": "Best Value",
        "badgeColor": "#0369a1",
        "facilities": [
          "wifi",
          "ac",
          "freeCancellation",
          "tv",
          "bathroom"
        ],
        "features": [
          "Free WiFi",
          "Air Conditioning",
          "Free Cancellation",
          "Smart TV",
          "Private Bathroom"
        ]
      },
      {
        "hotelId": 2,
        "name": "Rooftop Terrace Suite",
        "id": 202,
        "roomType": "Suite",
        "description": "Access a private rooftop terrace with sweeping 360° city views. This suite blends open-plan living with curated art pieces throughout.",
        "image": "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?auto=format&fit=crop&w=600&q=75",
        "gallery": [
          "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?auto=format&fit=crop&w=800&q=75"
        ],
        "price": 310,
        "originalPrice": 380,
        "discountPrice": 310,
        "availability": true,
        "availableRooms": 2,
        "maxGuests": 2,
        "bedType": "1 King Bed",
        "roomSize": "52 m²",
        "breakfast": true,
        "freeCancellation": true,
        "badge": "High Demand",
        "badgeColor": "#b45309",
        "facilities": [
          "wifi",
          "ac",
          "breakfast",
          "freeCancellation",
          "tv",
          "bathroom",
          "minibar",
          "coffee"
        ],
        "features": [
          "Free WiFi",
          "Air Conditioning",
          "Breakfast Included",
          "Free Cancellation",
          "Smart TV",
          "Private Bathroom",
          "Mini Bar",
          "Coffee Maker"
        ]
      }
    ]
  },
  {
    "id": 3,
    "name": "Azure Sea Resort & Spa",
    "location": "Cox's Bazar, Bangladesh",
    "description": "Azure Sea Resort & Spa stretches along the world's longest natural sea beach, offering a rare blend of coastal serenity and five-star luxury. Guests wake to the sound of waves and panoramic ocean views from private balconies. Our award-winning Aqua Spa draws from ancient Ayurvedic traditions, while the beachfront infinity pool creates a seamless visual merger with the sea beyond. Three speciality restaurants cater to every palate, from fresh seafood caught that morning to refined international cuisine.",
    "gallery": [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=75",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=75",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=75",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=75"
    ],
    "stars": 5,
    "guestRating": 9.1,
    "ratingLabel": "Exceptional",
    "reviewCount": 3102,
    "facilities": [
      "wifi",
      "pool",
      "spa",
      "restaurant",
      "gym"
    ],
    "policies": {
      "checkIn": "3:00 PM",
      "checkOut": "12:00 PM",
      "cancellationPolicy": "Non-refundable rate. No cancellations accepted after booking is confirmed."
    },
    "reviews": [
      {
        "user": "Ethan W.",
        "rating": 10,
        "comment": "The most beautiful resort I've ever stayed at. Waking up to the ocean every morning was magical."
      },
      {
        "user": "Aiko T.",
        "rating": 9,
        "comment": "Spa was phenomenal. The Ayurvedic treatment left me completely rejuvenated."
      },
      {
        "user": "Lucas M.",
        "rating": 9,
        "comment": "Family loved it. The kids' pool area and the beach access made it perfect for us."
      }
    ],
    "rooms": [
      {
        "hotelId": 3,
        "name": "Oceanfront Family Suite",
        "id": 301,
        "roomType": "Family Suite",
        "description": "A generous family suite opening directly onto the beach, with a separate kids' sleeping nook and full ocean views from every room.",
        "image": "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=600&q=75",
        "gallery": [
          "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=75"
        ],
        "price": 450,
        "originalPrice": null,
        "discountPrice": 450,
        "availability": true,
        "availableRooms": 4,
        "maxGuests": 4,
        "bedType": "1 King + 2 Twin Beds",
        "roomSize": "85 m²",
        "breakfast": true,
        "freeCancellation": false,
        "badge": null,
        "badgeColor": null,
        "facilities": [
          "wifi",
          "ac",
          "breakfast",
          "tv",
          "bathroom",
          "minibar"
        ],
        "features": [
          "Free WiFi",
          "Air Conditioning",
          "Breakfast Included",
          "Smart TV",
          "Private Bathroom",
          "Mini Bar"
        ]
      },
      {
        "hotelId": 3,
        "name": "Beachview Deluxe Room",
        "id": 302,
        "roomType": "Deluxe Room",
        "description": "A serene deluxe room with a private balcony framing uninterrupted views of the sea and beach below.",
        "image": "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=600&q=75",
        "gallery": [
          "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=75"
        ],
        "price": 360,
        "originalPrice": null,
        "discountPrice": 360,
        "availability": true,
        "availableRooms": 4,
        "maxGuests": 2,
        "bedType": "1 King Bed",
        "roomSize": "48 m²",
        "breakfast": true,
        "freeCancellation": true,
        "badge": null,
        "badgeColor": null,
        "facilities": [
          "wifi",
          "ac",
          "breakfast",
          "freeCancellation",
          "tv",
          "bathroom",
          "minibar"
        ],
        "features": [
          "Free WiFi",
          "Air Conditioning",
          "Breakfast Included",
          "Free Cancellation",
          "Smart TV",
          "Private Bathroom",
          "Mini Bar"
        ]
      }
    ]
  },
  {
    "id": 4,
    "name": "Metropolitan Business Inn",
    "location": "Motijheel, Dhaka, Bangladesh",
    "description": "Metropolitan Business Inn is Dhaka's go-to address for the corporate traveller seeking smart comfort at an accessible price. Located in the commercial heart of Motijheel, our hotel places you steps from the city's key financial institutions and government offices. Rooms are compact yet thoughtfully designed with ergonomic workstations, blackout curtains, and ultra-fast WiFi. Our complimentary breakfast buffet ensures you start every day fuelled and focused.",
    "gallery": [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=75",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=75",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=75",
      "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?auto=format&fit=crop&w=800&q=75"
    ],
    "stars": 3,
    "guestRating": 7.8,
    "ratingLabel": "Good",
    "reviewCount": 892,
    "facilities": [
      "wifi",
      "parking"
    ],
    "policies": {
      "checkIn": "2:00 PM",
      "checkOut": "12:00 PM",
      "cancellationPolicy": "Free cancellation up to 48 hours before check-in. After that, 1 night's charge applies."
    },
    "reviews": [
      {
        "user": "Ravi P.",
        "rating": 8,
        "comment": "Clean, well located, and the breakfast was surprisingly good. Great value."
      },
      {
        "user": "Sarah L.",
        "rating": 7,
        "comment": "Functional and comfortable for a business trip. Nothing fancy but does the job well."
      }
    ],
    "rooms": [
      {
        "hotelId": 4,
        "name": "Standard Single Room",
        "id": 401,
        "roomType": "Standard Room",
        "description": "A compact, efficient room built for the solo business traveller — ergonomic desk, blackout curtains, and ultra-fast WiFi.",
        "image": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=75",
        "gallery": [
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=75"
        ],
        "price": 75,
        "originalPrice": null,
        "discountPrice": 75,
        "availability": true,
        "availableRooms": 6,
        "maxGuests": 1,
        "bedType": "1 Single Bed",
        "roomSize": "22 m²",
        "breakfast": true,
        "freeCancellation": true,
        "badge": null,
        "badgeColor": null,
        "facilities": [
          "wifi",
          "ac",
          "breakfast",
          "freeCancellation",
          "tv",
          "bathroom"
        ],
        "features": [
          "Free WiFi",
          "Air Conditioning",
          "Breakfast Included",
          "Free Cancellation",
          "Smart TV",
          "Private Bathroom"
        ]
      },
      {
        "hotelId": 4,
        "name": "Business Double Room",
        "id": 402,
        "roomType": "Standard Room",
        "description": "A comfortable double room with a dedicated workstation, ideal for short business stays in the commercial district.",
        "image": "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=600&q=75",
        "gallery": [
          "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=75"
        ],
        "price": 95,
        "originalPrice": null,
        "discountPrice": 95,
        "availability": true,
        "availableRooms": 6,
        "maxGuests": 2,
        "bedType": "1 Double Bed",
        "roomSize": "30 m²",
        "breakfast": true,
        "freeCancellation": true,
        "badge": null,
        "badgeColor": null,
        "facilities": [
          "wifi",
          "ac",
          "breakfast",
          "freeCancellation",
          "tv",
          "bathroom"
        ],
        "features": [
          "Free WiFi",
          "Air Conditioning",
          "Breakfast Included",
          "Free Cancellation",
          "Smart TV",
          "Private Bathroom"
        ]
      }
    ]
  },
  {
    "id": 5,
    "name": "The Diplomat Residence",
    "location": "Baridhara, Dhaka, Bangladesh",
    "description": "The Diplomat Residence stands as Dhaka's most prestigious address, catering exclusively to heads of state, senior executives, and celebrities seeking absolute privacy and maximum sophistication. Every suite features bespoke furniture crafted by local artisans, a private dining area, and a dedicated butler available 24 hours. The wine cellar, curated by a master sommelier, houses over 800 labels. Security, discretion, and flawless service define every moment of your stay.",
    "gallery": [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=75",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=75",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=75",
      "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?auto=format&fit=crop&w=800&q=75"
    ],
    "stars": 5,
    "guestRating": 9.6,
    "ratingLabel": "Exceptional",
    "reviewCount": 4201,
    "facilities": [
      "wifi",
      "pool",
      "spa",
      "gym",
      "restaurant",
      "parking"
    ],
    "policies": {
      "checkIn": "4:00 PM",
      "checkOut": "1:00 PM",
      "cancellationPolicy": "Free cancellation up to 72 hours before check-in. Within 72 hours, 100% of total stay is charged."
    },
    "reviews": [
      {
        "user": "James A.",
        "rating": 10,
        "comment": "The finest hotel experience of my life. The butler service was seamlessly anticipatory."
      },
      {
        "user": "Yuki T.",
        "rating": 10,
        "comment": "Absolute perfection. Every detail attended to without being asked. The definition of luxury."
      },
      {
        "user": "Olivia R.",
        "rating": 9,
        "comment": "Breathtaking property. The wine cellar dinner was the highlight of our trip to Dhaka."
      }
    ],
    "rooms": [
      {
        "hotelId": 5,
        "name": "Presidential Suite",
        "id": 501,
        "roomType": "Presidential Suite",
        "description": "A full-floor private residence with bespoke artisan furniture, private dining area, and a dedicated 24-hour butler.",
        "image": "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?auto=format&fit=crop&w=600&q=75",
        "gallery": [
          "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?auto=format&fit=crop&w=800&q=75"
        ],
        "price": 680,
        "originalPrice": null,
        "discountPrice": 680,
        "availability": true,
        "availableRooms": 2,
        "maxGuests": 2,
        "bedType": "1 Super King Bed",
        "roomSize": "180 m²",
        "breakfast": true,
        "freeCancellation": true,
        "badge": "Exclusive",
        "badgeColor": "#7c3aed",
        "facilities": [
          "wifi",
          "ac",
          "breakfast",
          "freeCancellation",
          "tv",
          "bathroom",
          "minibar",
          "coffee"
        ],
        "features": [
          "Free WiFi",
          "Air Conditioning",
          "Breakfast Included",
          "Free Cancellation",
          "Smart TV",
          "Private Bathroom",
          "Mini Bar",
          "Coffee Maker"
        ]
      },
      {
        "hotelId": 5,
        "name": "Ambassador Suite",
        "id": 502,
        "roomType": "Suite",
        "description": "An elegant suite with artisan-crafted furnishings and a private dining nook, tailored for discreet, high-profile stays.",
        "image": "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=600&q=75",
        "gallery": [
          "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=75"
        ],
        "price": 520,
        "originalPrice": null,
        "discountPrice": 520,
        "availability": true,
        "availableRooms": 3,
        "maxGuests": 2,
        "bedType": "1 King Bed",
        "roomSize": "110 m²",
        "breakfast": true,
        "freeCancellation": true,
        "badge": null,
        "badgeColor": null,
        "facilities": [
          "wifi",
          "ac",
          "breakfast",
          "freeCancellation",
          "tv",
          "bathroom",
          "minibar",
          "coffee"
        ],
        "features": [
          "Free WiFi",
          "Air Conditioning",
          "Breakfast Included",
          "Free Cancellation",
          "Smart TV",
          "Private Bathroom",
          "Mini Bar",
          "Coffee Maker"
        ]
      }
    ]
  },
  {
    "id": 6,
    "name": "Garden View Suites",
    "location": "Dhanmondi, Dhaka, Bangladesh",
    "description": "Garden View Suites is a serene haven tucked into the leafy residential calm of Dhanmondi. Designed around a lush central courtyard garden, our suites open directly onto private verandahs overlooking manicured greenery — a rare luxury in urban Dhaka. We cater to families, long-stay guests, and those who prefer space over spectacle. A heated outdoor pool, a warm restaurant serving Bangladeshi and international comfort food, and our attentive family-first service make Garden View Suites a home away from home.",
    "gallery": [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=75",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=75",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=75",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=75"
    ],
    "stars": 4,
    "guestRating": 8.2,
    "ratingLabel": "Very Good",
    "reviewCount": 1105,
    "facilities": [
      "wifi",
      "pool",
      "parking",
      "restaurant"
    ],
    "policies": {
      "checkIn": "2:00 PM",
      "checkOut": "12:00 PM",
      "cancellationPolicy": "Free cancellation up to 48 hours before check-in. Partial charge applies for late cancellations."
    },
    "reviews": [
      {
        "user": "Mei L.",
        "rating": 8,
        "comment": "Such a peaceful property! The garden is beautiful and the kids loved the pool."
      },
      {
        "user": "Carlos R.",
        "rating": 8,
        "comment": "Great for families. Lots of space, friendly staff and the food is home-cooked quality."
      }
    ],
    "rooms": [
      {
        "hotelId": 6,
        "name": "Garden Deluxe Suite",
        "id": 601,
        "roomType": "Suite",
        "description": "A tranquil suite opening onto a private verandah overlooking the courtyard garden — space and calm in the heart of the city.",
        "image": "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=600&q=75",
        "gallery": [
          "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=75"
        ],
        "price": 155,
        "originalPrice": null,
        "discountPrice": 155,
        "availability": true,
        "availableRooms": 5,
        "maxGuests": 2,
        "bedType": "1 King Bed",
        "roomSize": "55 m²",
        "breakfast": true,
        "freeCancellation": true,
        "badge": null,
        "badgeColor": null,
        "facilities": [
          "wifi",
          "ac",
          "breakfast",
          "freeCancellation",
          "tv",
          "bathroom"
        ],
        "features": [
          "Free WiFi",
          "Air Conditioning",
          "Breakfast Included",
          "Free Cancellation",
          "Smart TV",
          "Private Bathroom"
        ]
      },
      {
        "hotelId": 6,
        "name": "Family Garden Suite",
        "id": 602,
        "roomType": "Family Suite",
        "description": "A generous family suite with a bunk bed nook for children and direct courtyard garden views — space for everyone to unwind.",
        "image": "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=600&q=75",
        "gallery": [
          "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=75"
        ],
        "price": 210,
        "originalPrice": null,
        "discountPrice": 210,
        "availability": true,
        "availableRooms": 4,
        "maxGuests": 4,
        "bedType": "1 King + 1 Bunk Bed",
        "roomSize": "78 m²",
        "breakfast": true,
        "freeCancellation": true,
        "badge": null,
        "badgeColor": null,
        "facilities": [
          "wifi",
          "ac",
          "breakfast",
          "freeCancellation",
          "tv",
          "bathroom"
        ],
        "features": [
          "Free WiFi",
          "Air Conditioning",
          "Breakfast Included",
          "Free Cancellation",
          "Smart TV",
          "Private Bathroom"
        ]
      }
    ]
  },
  {
    "id": 7,
    "name": "Harbour Lights Hotel",
    "location": "Old Dhaka, Bangladesh",
    "description": "Harbour Lights Hotel occupies a lovingly restored colonial-era building on the banks of the Buriganga River. The property marries heritage architecture with modern comforts — original wooden beams and terracotta tile floors coexist with pillow-top mattresses and rain showers. Our rooftop restaurant is celebrated for its evening river views and fresh water-to-table seafood menu. Walking tours of Old Dhaka's Mughal-era mosques, spice markets, and river ghats depart from our front door.",
    "gallery": [
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=75",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=75",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=75",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=75"
    ],
    "stars": 4,
    "guestRating": 8.5,
    "ratingLabel": "Excellent",
    "reviewCount": 978,
    "facilities": [
      "wifi",
      "gym",
      "restaurant"
    ],
    "policies": {
      "checkIn": "3:00 PM",
      "checkOut": "11:00 AM",
      "cancellationPolicy": "Non-refundable. Modifications are subject to availability and may incur fees."
    },
    "reviews": [
      {
        "user": "Tom B.",
        "rating": 9,
        "comment": "So much character! The history of this building adds so much to the experience."
      },
      {
        "user": "Fatima A.",
        "rating": 8,
        "comment": "The rooftop dinner over the river was unforgettable. Unique hotel in a unique setting."
      }
    ],
    "rooms": [
      {
        "hotelId": 7,
        "name": "Heritage River View Room",
        "id": 701,
        "roomType": "Standard Room",
        "description": "A room within the original colonial structure, pairing wooden beams and terracotta floors with a pillow-top mattress and rain shower.",
        "image": "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=600&q=75",
        "gallery": [
          "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=75"
        ],
        "price": 210,
        "originalPrice": null,
        "discountPrice": 210,
        "availability": true,
        "availableRooms": 3,
        "maxGuests": 2,
        "bedType": "1 Queen Bed",
        "roomSize": "35 m²",
        "breakfast": false,
        "freeCancellation": false,
        "badge": null,
        "badgeColor": null,
        "facilities": [
          "wifi",
          "ac",
          "tv",
          "bathroom"
        ],
        "features": [
          "Free WiFi",
          "Air Conditioning",
          "Smart TV",
          "Private Bathroom"
        ]
      },
      {
        "hotelId": 7,
        "name": "Colonial Courtyard Suite",
        "id": 702,
        "roomType": "Suite",
        "description": "A heritage suite overlooking the restored courtyard, blending original architecture with a modern rain-shower ensuite.",
        "image": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=75",
        "gallery": [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=75"
        ],
        "price": 290,
        "originalPrice": null,
        "discountPrice": 290,
        "availability": true,
        "availableRooms": 2,
        "maxGuests": 2,
        "bedType": "1 King Bed",
        "roomSize": "50 m²",
        "breakfast": false,
        "freeCancellation": false,
        "badge": null,
        "badgeColor": null,
        "facilities": [
          "wifi",
          "ac",
          "tv",
          "bathroom"
        ],
        "features": [
          "Free WiFi",
          "Air Conditioning",
          "Smart TV",
          "Private Bathroom"
        ]
      }
    ]
  },
  {
    "id": 8,
    "name": "Prestige Penthouse Hotel",
    "location": "Uttara, Dhaka, Bangladesh",
    "description": "Prestige Penthouse Hotel redefines the concept of sky-high living in Dhaka. Our 42-floor tower hosts only 60 exclusive suites, each spanning an entire floor segment with unobstructed panoramic views of the city. The crown jewel is the 40th-floor infinity pool that appears to float among the clouds. Our Michelin-inspired restaurant, Altitude, serves a 7-course tasting menu that changes monthly. For families, the supervised kids' adventure zone and family spa treatment rooms offer experiences as lavish for the young as the adults.",
    "gallery": [
      "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=75",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=75",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=75",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=75"
    ],
    "stars": 5,
    "guestRating": 9.3,
    "ratingLabel": "Exceptional",
    "reviewCount": 2210,
    "facilities": [
      "wifi",
      "pool",
      "spa",
      "gym",
      "restaurant",
      "parking"
    ],
    "policies": {
      "checkIn": "3:00 PM",
      "checkOut": "12:00 PM",
      "cancellationPolicy": "Free cancellation up to 72 hours before check-in. Within 72 hours, 100% of stay is charged."
    },
    "reviews": [
      {
        "user": "Yuki T.",
        "rating": 10,
        "comment": "The infinity pool on the 40th floor is the most dramatic thing I've ever seen. Absolutely stunning."
      },
      {
        "user": "Marco V.",
        "rating": 9,
        "comment": "Altitude restaurant's tasting menu was a culinary journey. The views made it even more special."
      },
      {
        "user": "Hannah C.",
        "rating": 9,
        "comment": "Perfect for our family trip. The kids' zone kept the little ones happy while we relaxed at the spa."
      }
    ],
    "rooms": [
      {
        "hotelId": 8,
        "name": "Sky Penthouse Suite",
        "id": 801,
        "roomType": "Penthouse Suite",
        "description": "An entire floor segment 40 storeys up, with unobstructed panoramic city views and access to the cloud-level infinity pool.",
        "image": "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?auto=format&fit=crop&w=600&q=75",
        "gallery": [
          "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?auto=format&fit=crop&w=800&q=75"
        ],
        "price": 520,
        "originalPrice": null,
        "discountPrice": 520,
        "availability": true,
        "availableRooms": 3,
        "maxGuests": 2,
        "bedType": "1 Super King Bed",
        "roomSize": "150 m²",
        "breakfast": true,
        "freeCancellation": true,
        "badge": "High Demand",
        "badgeColor": "#b45309",
        "facilities": [
          "wifi",
          "ac",
          "breakfast",
          "freeCancellation",
          "tv",
          "bathroom",
          "minibar",
          "coffee"
        ],
        "features": [
          "Free WiFi",
          "Air Conditioning",
          "Breakfast Included",
          "Free Cancellation",
          "Smart TV",
          "Private Bathroom",
          "Mini Bar",
          "Coffee Maker"
        ]
      },
      {
        "hotelId": 8,
        "name": "Family Panorama Suite",
        "id": 802,
        "roomType": "Family Suite",
        "description": "A vast family suite spanning 200 m² with panoramic city views, built for families who want space without compromise.",
        "image": "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=600&q=75",
        "gallery": [
          "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=75"
        ],
        "price": 680,
        "originalPrice": null,
        "discountPrice": 680,
        "availability": true,
        "availableRooms": 2,
        "maxGuests": 4,
        "bedType": "1 King + 2 Twin Beds",
        "roomSize": "200 m²",
        "breakfast": true,
        "freeCancellation": true,
        "badge": null,
        "badgeColor": null,
        "facilities": [
          "wifi",
          "ac",
          "breakfast",
          "freeCancellation",
          "tv",
          "bathroom",
          "minibar",
          "coffee"
        ],
        "features": [
          "Free WiFi",
          "Air Conditioning",
          "Breakfast Included",
          "Free Cancellation",
          "Smart TV",
          "Private Bathroom",
          "Mini Bar",
          "Coffee Maker"
        ]
      },
      {
        "hotelId": 8,
        "name": "Cloud View Double",
        "id": 803,
        "roomType": "Standard Room",
        "description": "A comfortable double room with sweeping cloud-level city views, an accessible entry point into the Prestige Penthouse experience.",
        "image": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=75",
        "gallery": [
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=75"
        ],
        "price": 380,
        "originalPrice": null,
        "discountPrice": 380,
        "availability": true,
        "availableRooms": 5,
        "maxGuests": 2,
        "bedType": "1 King Bed",
        "roomSize": "65 m²",
        "breakfast": false,
        "freeCancellation": true,
        "badge": null,
        "badgeColor": null,
        "facilities": [
          "wifi",
          "ac",
          "freeCancellation",
          "tv",
          "bathroom"
        ],
        "features": [
          "Free WiFi",
          "Air Conditioning",
          "Free Cancellation",
          "Smart TV",
          "Private Bathroom"
        ]
      }
    ]
  }
];

export default hotelDetailsData;