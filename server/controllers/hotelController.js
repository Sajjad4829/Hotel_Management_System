import Hotel from '../models/Hotel.js';
import Room from '../models/Room.js';

// Initial default seed properties to auto-populate empty database on initial connection
const DEFAULT_SEED_HOTELS = [
  {
    name: "Aurum Hotel Dhaka",
    description: "Our flagship 5-star luxury property in the heart of the capital, offering unparalleled elegance, gourmet dining, and executive suites with panoramic skyline views.",
    location: "Dhaka, Bangladesh",
    address: "Gulshan-2, Dhaka, Bangladesh",
    destination: "dest-dhaka",
    starRating: 5,
    rating: "4.9/5",
    contactInfo: { phone: "+880 1711-100200", email: "dhaka@aurumhotels.com" },
    checkInTime: "2:00 PM (14:00)",
    checkOutTime: "12:00 PM (12:00)",
    facilities: ["Free WiFi", "Infinity Pool", "Luxury Spa", "Rooftop Bar", "Gym", "Valet Parking"],
    amenities: ["Free WiFi", "Infinity Pool", "Luxury Spa", "Rooftop Bar"],
    mainImage: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80",
    image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80"
    ],
    price: 180,
    originalPrice: 240,
    reviewCount: 142,
    isActive: true,
  },
  {
    name: "Aurum Resort Cox's Bazar",
    description: "A breathtaking beachfront luxury resort situated along Marine Drive on the world's longest natural sea beach, boasting private villas and oceanfront infinity dining.",
    location: "Cox's Bazar, Bangladesh",
    address: "Marine Drive Road, Inani Beach, Cox's Bazar",
    destination: "dest-coxs-bazar",
    starRating: 5,
    rating: "4.8/5",
    contactInfo: { phone: "+880 1819-300400", email: "coxsbazar@aurumhotels.com" },
    checkInTime: "2:00 PM (14:00)",
    checkOutTime: "11:30 AM (11:30)",
    facilities: ["Private Beach", "Seafood Restaurant", "Water Sports", "Infinity Pool", "Spa", "Airport Transfer"],
    amenities: ["Private Beach", "Seafood Restaurant", "Water Sports", "Gym"],
    mainImage: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80"
    ],
    price: 210,
    originalPrice: 280,
    reviewCount: 198,
    isActive: true,
  },
  {
    name: "Aurum Eco Resort Sylhet",
    description: "Nestled seamlessly within lush emerald tea gardens and ancient rainforest hills, our eco-luxury retreat combines sustainable serenity with restorative wellness.",
    location: "Sylhet, Bangladesh",
    address: "Khadimnagar National Park Road, Sylhet",
    destination: "dest-sylhet",
    starRating: 5,
    rating: "4.7/5",
    contactInfo: { phone: "+880 1715-500600", email: "sylhet@aurumhotels.com" },
    checkInTime: "3:00 PM (15:00)",
    checkOutTime: "12:00 PM (12:00)",
    facilities: ["Nature Trails", "Organic Dining", "Yoga Pavilion", "Ayurvedic Spa", "Helipad"],
    amenities: ["Nature Trails", "Organic Dining", "Yoga Pavilion", "Spa"],
    mainImage: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
    ],
    price: 160,
    originalPrice: 210,
    reviewCount: 95,
    isActive: true,
  },
  {
    name: "Aurum Boutique Sreemangal",
    description: "An intimate heritage boutique estate overlooking rolling tea hills, offering curated tasting ceremonies and cozy fireside luxury in the tea capital of Bangladesh.",
    location: "Sreemangal, Bangladesh",
    address: "Radhanagar, Sreemangal, Moulvibazar",
    destination: "dest-sreemangal",
    starRating: 5,
    rating: "4.9/5",
    contactInfo: { phone: "+880 1817-700800", email: "sreemangal@aurumhotels.com" },
    checkInTime: "2:00 PM (14:00)",
    checkOutTime: "11:30 AM (11:30)",
    facilities: ["Tea Tasting Lounge", "Bicycle Rental", "Heritage Library", "Fire Pit", "Heated Pool"],
    amenities: ["Tea Tasting", "Bicycle Rental", "Library", "Fire Pit"],
    mainImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
    ],
    price: 195,
    originalPrice: 260,
    reviewCount: 118,
    isActive: true,
  }
];

// ============================================================================
// @desc    Get all hotels (with optional auto-seeding if empty)
// @route   GET /api/hotels
// @access  Public
// ============================================================================
export const getHotels = async (req, res) => {
  try {
    let hotels = await Hotel.find({}).sort({ createdAt: -1 });

    // Proactively seed luxury demonstration properties if collection is entirely empty
    if (hotels.length === 0) {
      console.log('🌱 No hotels found in MongoDB Atlas. Auto-seeding initial luxury properties...');
      hotels = await Hotel.insertMany(DEFAULT_SEED_HOTELS);
    }

    return res.status(200).json({
      success: true,
      count: hotels.length,
      data: hotels,
    });
  } catch (error) {
    console.error('Fetch Hotels Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error while retrieving hotels.',
      error: error.message,
    });
  }
};

// ============================================================================
// @desc    Get single hotel by ID or slug
// @route   GET /api/hotels/:id
// @access  Public
// ============================================================================
export const getHotelById = async (req, res) => {
  try {
    const { id } = req.params;
    let hotel;

    // Check if valid MongoDB ObjectId or fallback to name/destination matching
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      hotel = await Hotel.findById(id).populate('rooms');
    } else {
      hotel = await Hotel.findOne({ $or: [{ id: id }, { destination: id }, { name: new RegExp(id.replace(/-/g, ' '), 'i') }] });
    }

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: 'Hotel property not found.',
      });
    }

    // Fetch related rooms for this property
    const rooms = await Room.find({ $or: [{ hotelId: hotel._id }, { propertyId: hotel._id.toString() }, { propertyId: id }] });
    
    const responseObj = hotel.toObject();
    responseObj.roomsList = rooms;

    return res.status(200).json({
      success: true,
      data: responseObj,
    });
  } catch (error) {
    console.error('Fetch Hotel By ID Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve hotel details.',
    });
  }
};

// ============================================================================
// @desc    Create a new hotel property
// @route   POST /api/hotels
// @access  Private / Admin
// ============================================================================
export const createHotel = async (req, res) => {
  try {
    const { name, mainImage, image, rating, starRating } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Hotel Name is required to create a new property.',
      });
    }

    const assignedImage = mainImage || image || 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80';
    const numRating = !isNaN(Number(starRating)) && Number(starRating) > 0 ? Number(starRating) : 5;

    const newHotel = await Hotel.create({
      ...req.body,
      name: name.trim(),
      mainImage: assignedImage,
      image: assignedImage,
      starRating: numRating,
      rating: rating || `${numRating}/5`,
    });

    return res.status(201).json({
      success: true,
      message: 'Hotel property created successfully in database.',
      data: newHotel,
    });
  } catch (error) {
    console.error('Create Hotel Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error while creating hotel.',
      error: error.message,
    });
  }
};


// ============================================================================
// @desc    Update existing hotel details
// @route   PUT /api/hotels/:id
// @access  Private / Admin
// ============================================================================
export const updateHotel = async (req, res) => {
  try {
    const { id } = req.params;
    let hotel;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      hotel = await Hotel.findById(id);
    } else {
      hotel = await Hotel.findOne({ name: new RegExp(id, 'i') });
    }

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: 'Hotel property not found for update.',
      });
    }

    const updatedHotel = await Hotel.findByIdAndUpdate(
      hotel._id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      message: 'Hotel property updated successfully.',
      data: updatedHotel,
    });
  } catch (error) {
    console.error('Update Hotel Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update hotel property.',
    });
  }
};

// ============================================================================
// @desc    Delete a hotel and unlink associated rooms
// @route   DELETE /api/hotels/:id
// @access  Private / Admin
// ============================================================================
export const deleteHotel = async (req, res) => {
  try {
    const { id } = req.params;
    let hotel;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      hotel = await Hotel.findById(id);
    } else {
      hotel = await Hotel.findOne({ name: new RegExp(id, 'i') });
    }

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: 'Hotel property not found for deletion.',
      });
    }

    // Delete associated rooms in cascade or unbind them
    await Room.deleteMany({ hotelId: hotel._id });
    await Hotel.findByIdAndDelete(hotel._id);

    return res.status(200).json({
      success: true,
      message: 'Hotel property and associated inventory removed successfully.',
    });
  } catch (error) {
    console.error('Delete Hotel Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while deleting hotel.',
    });
  }
};
