import Amenity from '../models/Amenity.js';

// Default seeding for Hotel and Room Amenities as defined in Phase 5 specifications
const DEFAULT_SEED_AMENITIES = [
  // Hotel Amenities
  { name: "Swimming Pool", type: "hotel", icon: "FiDroplet", description: "Outdoor Olympic temperature-controlled swimming pool." },
  { name: "Restaurant", type: "hotel", icon: "FiCoffee", description: "Multi-cuisine gourmet restaurant with Michelin-starred chefs." },
  { name: "Gym", type: "hotel", icon: "FiActivity", description: "24/7 high-tech fitness gymnasium with personal trainers." },
  { name: "Spa", type: "hotel", icon: "FiSmile", description: "Holistic wellness spa offering Thai massages and aroma therapies." },
  { name: "Parking", type: "hotel", icon: "FiTruck", description: "Complimentary underground valet parking for guests." },
  { name: "WiFi", type: "both", icon: "FiWifi", description: "High-speed optical fiber wireless broadband connection." },
  
  // Room Amenities
  { name: "AC", type: "room", icon: "FiWind", description: "Individually controlled multi-zone central climate air conditioning." },
  { name: "TV", type: "room", icon: "FiTv", description: "65-inch OLED 4K Smart television with international streaming channels." },
  { name: "Balcony", type: "room", icon: "FiSun", description: "Private furnished teak wood deck balcony overlooking the horizon." },
  { name: "Mini Bar", type: "room", icon: "FiBox", description: "Fully stocked mini bar with artisan snacks and refreshing beverages." },
  { name: "Bathroom", type: "room", icon: "FiDroplet", description: "Marble ensuite bathroom with rainfall shower and soaking bathtub." }
];

// ============================================================================
// @desc    Get all amenities (with optional filtering by type and auto-seed)
// @route   GET /api/amenities
// @access  Public
// ============================================================================
export const getAmenities = async (req, res) => {
  try {
    const { type } = req.query;
    let filter = {};

    if (type && type !== 'all') {
      filter.$or = [{ type: type }, { type: 'both' }];
    }

    let amenities = await Amenity.find(filter).sort({ type: 1, name: 1 });

    if (amenities.length === 0 && !type) {
      console.log('🌱 No amenities found in MongoDB Atlas. Auto-seeding catalog...');
      await Amenity.insertMany(DEFAULT_SEED_AMENITIES);
      amenities = await Amenity.find(filter).sort({ type: 1, name: 1 });
    }

    return res.status(200).json({
      success: true,
      count: amenities.length,
      data: amenities,
    });
  } catch (error) {
    console.error('Fetch Amenities Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error while fetching amenities.',
    });
  }
};

// ============================================================================
// @desc    Create a new amenity
// @route   POST /api/amenities
// @access  Private / Admin
// ============================================================================
export const createAmenity = async (req, res) => {
  try {
    const { name, type, icon, description, isActive } = req.body;

    if (!name || !type) {
      return res.status(400).json({
        success: false,
        message: 'Amenity Name and Type (hotel/room) are required.',
      });
    }

    const existing = await Amenity.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'An amenity with this exact name already exists in the catalog.',
      });
    }

    const newAmenity = await Amenity.create({
      name,
      type,
      icon: icon || 'FiCheck',
      description: description || `${name} amenity service.`,
      isActive: isActive !== undefined ? isActive : true,
    });

    return res.status(201).json({
      success: true,
      message: 'Amenity successfully added to inventory catalog.',
      data: newAmenity,
    });
  } catch (error) {
    console.error('Create Amenity Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while creating amenity.',
      error: error.message,
    });
  }
};

// ============================================================================
// @desc    Update existing amenity
// @route   PUT /api/amenities/:id
// @access  Private / Admin
// ============================================================================
export const updateAmenity = async (req, res) => {
  try {
    const { id } = req.params;
    const amenity = await Amenity.findById(id);

    if (!amenity) {
      return res.status(404).json({
        success: false,
        message: 'Amenity record not found for update.',
      });
    }

    const updatedAmenity = await Amenity.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      message: 'Amenity updated successfully.',
      data: updatedAmenity,
    });
  } catch (error) {
    console.error('Update Amenity Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update amenity record.',
    });
  }
};

// ============================================================================
// @desc    Delete an amenity
// @route   DELETE /api/amenities/:id
// @access  Private / Admin
// ============================================================================
export const deleteAmenity = async (req, res) => {
  try {
    const { id } = req.params;
    const amenity = await Amenity.findByIdAndDelete(id);

    if (!amenity) {
      return res.status(404).json({
        success: false,
        message: 'Amenity record not found for deletion.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Amenity successfully deleted from system.',
    });
  } catch (error) {
    console.error('Delete Amenity Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while deleting amenity.',
    });
  }
};
