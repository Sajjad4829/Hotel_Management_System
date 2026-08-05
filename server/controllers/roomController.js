import Room from '../models/Room.js';
import Hotel from '../models/Hotel.js';

const DEFAULT_SEED_ROOMS = [
  { 
    propertyId: "dhaka-gulshan", roomNo: "101", roomName: "Deluxe King Room", roomType: "Deluxe", type: "Deluxe", floor: "1", 
    pricePerNight: 150, price: 150, discountPrice: 0, availabilityStatus: "Available", status: "Available",
    description: "A beautifully appointed room featuring King-sized custom comfort beds, marble bathrooms, and panoramic floor-to-ceiling skyline windows.",
    shortDescription: "A beautifully appointed room with stunning city views.",
    thumbnailImage: "https://images.unsplash.com/photo-1542314831-c6a4d27ce66f?auto=format&fit=crop&w=800&q=80",
    roomImages: [
      "https://images.unsplash.com/photo-1542314831-c6a4d27ce66f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80"
    ],
    bedType: "King", roomSize: 450, maxAdults: 2, maxChildren: 1,
    capacity: { adults: 2, children: 1 },
    amenities: ["WiFi", "AC", "TV", "Mini Bar", "Bathroom", "Balcony"], isFeatured: true, isActive: true
  },
  { 
    propertyId: "dhaka-gulshan", roomNo: "301", roomName: "Presidential Royal Suite", roomType: "Presidential", type: "Presidential", floor: "3", 
    pricePerNight: 480, price: 480, discountPrice: 420, availabilityStatus: "Available", status: "Available",
    description: "The crown jewel of our accommodations offering expansive living spaces, private dining parlor, butler assistance, and private infinity jacuzzi.",
    shortDescription: "The pinnacle of luxury with panoramic views and separate living area.",
    thumbnailImage: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
    roomImages: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
    ],
    bedType: "King", roomSize: 950, maxAdults: 4, maxChildren: 2,
    capacity: { adults: 4, children: 2 },
    amenities: ["WiFi", "AC", "TV", "Mini Bar", "Balcony", "Private Jacuzzi", "Butler Service"], isFeatured: true, isActive: true
  },
  { 
    propertyId: "coxs-bazar-resort", roomNo: "102", roomName: "Oceanfront Sunset Villa", roomType: "Villa", type: "Villa", floor: "G", 
    pricePerNight: 280, price: 280, discountPrice: 250, availabilityStatus: "Available", status: "Available",
    description: "A private freestanding beach villa steps from the gentle surf, featuring private infinity dipping pools and direct beach lounge deck access.",
    shortDescription: "Comfortable private villa facing the ocean beach.",
    thumbnailImage: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
    roomImages: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80"
    ],
    bedType: "King", roomSize: 650, maxAdults: 2, maxChildren: 2,
    capacity: { adults: 2, children: 2 },
    amenities: ["WiFi", "AC", "TV", "Private Beach Access", "Mini Bar", "Balcony"], isFeatured: true, isActive: true
  },
  { 
    propertyId: "sylhet-eco", roomNo: "204", roomName: "Tea Garden Sanctuary Suite", roomType: "Suite", type: "Suite", floor: "2", 
    pricePerNight: 190, price: 190, discountPrice: 0, availabilityStatus: "Available", status: "Available",
    description: "Immerse in nature with wrap-around teak wood balconies overlooking emerald tea canopies and morning mist.",
    shortDescription: "Serene suite overlooking tea plantations.",
    thumbnailImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    roomImages: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
    ],
    bedType: "Queen", roomSize: 500, maxAdults: 2, maxChildren: 1,
    capacity: { adults: 2, children: 1 },
    amenities: ["WiFi", "AC", "TV", "Balcony", "Herbal Tea Bar"], isFeatured: false, isActive: true
  }
];

// ============================================================================
// @desc    Get all rooms (with optional auto-seeding & Hotel ObjectId linkage)
// @route   GET /api/rooms
// @access  Public
// ============================================================================
export const getRooms = async (req, res) => {
  try {
    const { hotelId, roomType, availabilityStatus } = req.query;
    let filter = {};

    if (hotelId) {
      filter.$or = [{ hotelId: hotelId }, { propertyId: hotelId }];
    }
    if (roomType) {
      filter.roomType = roomType;
    }
    if (availabilityStatus) {
      filter.availabilityStatus = availabilityStatus;
    }

    let rooms = await Room.find(filter).populate('hotelId', 'name location starRating address mainImage').sort({ createdAt: -1 });

    // Proactively seed demonstration room inventory if collection is empty
    if (rooms.length === 0 && Object.keys(filter).length === 0) {
      console.log('🌱 No rooms found in MongoDB Atlas. Auto-seeding initial luxury inventory...');
      
      // Attempt to link seed rooms to actual created hotels by matching city names
      const allHotels = await Hotel.find({});
      const seededRoomsData = DEFAULT_SEED_ROOMS.map((room) => {
        let matchedHotel = allHotels.find(h => 
          (room.propertyId === 'dhaka-gulshan' && h.name.includes('Dhaka')) ||
          (room.propertyId === 'coxs-bazar-resort' && h.name.includes("Cox's Bazar")) ||
          (room.propertyId === 'sylhet-eco' && h.name.includes('Sylhet'))
        );
        if (!matchedHotel && allHotels.length > 0) {
          matchedHotel = allHotels[0];
        }
        return {
          ...room,
          hotelId: matchedHotel ? matchedHotel._id : undefined,
          propertyId: matchedHotel ? matchedHotel._id.toString() : room.propertyId
        };
      });

      rooms = await Room.insertMany(seededRoomsData);
      rooms = await Room.find({}).populate('hotelId', 'name location starRating address mainImage').sort({ createdAt: -1 });
    }

    return res.status(200).json({
      success: true,
      count: rooms.length,
      data: rooms,
    });
  } catch (error) {
    console.error('Fetch Rooms Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error while retrieving room inventory.',
      error: error.message,
    });
  }
};

// ============================================================================
// @desc    Get single room by ID
// @route   GET /api/rooms/:id
// @access  Public
// ============================================================================
export const getRoomById = async (req, res) => {
  try {
    const { id } = req.params;
    let room;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      room = await Room.findById(id).populate('hotelId');
    } else {
      room = await Room.findOne({ $or: [{ id: id }, { roomNo: id }] }).populate('hotelId');
    }

    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room accommodation not found.',
      });
    }

    return res.status(200).json({
      success: true,
      data: room,
    });
  } catch (error) {
    console.error('Fetch Room By ID Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve room details.',
    });
  }
};

// ============================================================================
// @desc    Create a new room linked to a Hotel property
// @route   POST /api/rooms
// @access  Private / Admin
// ============================================================================
export const createRoom = async (req, res) => {
  try {
    const {
      hotelId,
      propertyId,
      roomName,
      name,
      roomNo,
      roomType,
      type,
      description,
      shortDescription,
      pricePerNight,
      price,
      discountPrice,
      capacity,
      maxAdults,
      maxChildren,
      bedType,
      roomSize,
      amenities,
      roomImages,
      thumbnailImage,
      availabilityStatus,
      status,
      floor,
      isFeatured,
      isActive,
    } = req.body;

    const assignedName = roomName || name;
    if (!assignedName) {
      return res.status(400).json({
        success: false,
        message: 'Room Name is a required field.',
      });
    }

    // Determine target Hotel ObjectId reference
    let targetHotelId = hotelId || propertyId;
    if (targetHotelId && typeof targetHotelId === 'string' && !targetHotelId.match(/^[0-9a-fA-F]{24}$/)) {
      const existingHotel = await Hotel.findOne({ $or: [{ destination: targetHotelId }, { name: new RegExp(targetHotelId.replace(/-/g, ' '), 'i') }] });
      if (existingHotel) {
        targetHotelId = existingHotel._id;
      } else {
        const firstHotel = await Hotel.findOne({});
        if (firstHotel) targetHotelId = firstHotel._id;
      }
    } else if (!targetHotelId) {
      const firstHotel = await Hotel.findOne({});
      if (firstHotel) targetHotelId = firstHotel._id;
    }

    // Protect against invalid ObjectId cast attempts
    let validHotelObjectId = undefined;
    if (targetHotelId && targetHotelId.toString().match(/^[0-9a-fA-F]{24}$/)) {
      validHotelObjectId = targetHotelId;
    }

    const newRoom = await Room.create({
      ...req.body,
      hotelId: validHotelObjectId,
      propertyId: validHotelObjectId ? validHotelObjectId.toString() : propertyId || 'default-property',
      roomName: assignedName.trim(),
      roomNo: roomNo || `${Math.floor(100 + Math.random() * 899)}`,
      roomType: roomType || type || 'Deluxe',
      type: type || roomType || 'Deluxe',
      description: description || 'Luxury suite accommodation.',
      shortDescription: shortDescription || description || 'Stunning luxury accommodation.',
      pricePerNight: Number(pricePerNight || price) || 150,
      price: Number(price || pricePerNight) || 150,
      discountPrice: Number(discountPrice) || 0,
      capacity: capacity || { adults: Number(maxAdults) || 2, children: Number(maxChildren) || 1 },
      maxAdults: Number(maxAdults) || 2,
      maxChildren: Number(maxChildren) || 1,
      bedType: bedType || 'King',
      roomSize: Number(roomSize) || 450,
      amenities: amenities || ['WiFi', 'AC', 'TV', 'Mini Bar', 'Bathroom'],
      roomImages: roomImages || [thumbnailImage || 'https://images.unsplash.com/photo-1542314831-c6a4d27ce66f?auto=format&fit=crop&w=800&q=80'],
      thumbnailImage: thumbnailImage || (roomImages && roomImages[0]) || 'https://images.unsplash.com/photo-1542314831-c6a4d27ce66f?auto=format&fit=crop&w=800&q=80',
      availabilityStatus: availabilityStatus || status || 'Available',
      status: status || availabilityStatus || 'Available',
      floor: floor || '1',
      isFeatured: isFeatured !== undefined ? isFeatured : true,
      isActive: isActive !== undefined ? isActive : true,
    });

    let populatedRoom = newRoom;
    if (validHotelObjectId) {
      populatedRoom = await Room.findById(newRoom._id).populate('hotelId', 'name location starRating');
    }

    return res.status(201).json({
      success: true,
      message: 'Room created and successfully linked to Hotel property.',
      data: populatedRoom || newRoom,
    });
  } catch (error) {
    console.error('Create Room Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error while creating room.',
      error: error.message,
    });
  }
};

// ============================================================================
// @desc    Update room details
// @route   PUT /api/rooms/:id
// @access  Private / Admin
// ============================================================================
export const updateRoom = async (req, res) => {
  try {
    const { id } = req.params;
    let room;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      room = await Room.findById(id);
    } else {
      room = await Room.findOne({ $or: [{ roomNo: id }, { id: id }] });
    }

    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found for update.',
      });
    }

    const updatedRoom = await Room.findByIdAndUpdate(
      room._id,
      { $set: req.body },
      { new: true, runValidators: true }
    ).populate('hotelId', 'name location starRating');

    return res.status(200).json({
      success: true,
      message: 'Room accommodation updated successfully.',
      data: updatedRoom,
    });
  } catch (error) {
    console.error('Update Room Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update room accommodation.',
    });
  }
};

// ============================================================================
// @desc    Delete a room
// @route   DELETE /api/rooms/:id
// @access  Private / Admin
// ============================================================================
export const deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;
    let room;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      room = await Room.findById(id);
    } else {
      room = await Room.findOne({ $or: [{ roomNo: id }, { id: id }] });
    }

    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room accommodation not found for deletion.',
      });
    }

    await Room.findByIdAndDelete(room._id);

    return res.status(200).json({
      success: true,
      message: 'Room accommodation removed from active inventory successfully.',
    });
  } catch (error) {
    console.error('Delete Room Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while deleting room.',
    });
  }
};
