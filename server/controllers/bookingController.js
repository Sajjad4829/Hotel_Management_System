import Booking from '../models/Booking.js';
import Room from '../models/Room.js';
import Hotel from '../models/Hotel.js';

// ============================================================================
// @desc    Create a new hotel room booking & reduce available inventory
// @route   POST /api/bookings/create
// @access  Private (Authenticated Users)
// ============================================================================
export const createBooking = async (req, res) => {
  try {
    const {
      hotel,
      hotelId,
      room,
      roomId,
      checkIn,
      checkOut,
      guests,
      rooms,
      totalPrice,
      paymentStatus,
      paymentMethod,
      specialRequest,
    } = req.body;

    const hotelRef = hotel || hotelId;
    const roomRef = room || roomId;

    // 1. Validate required parameters
    if (!hotelRef || !roomRef || !checkIn || !checkOut || totalPrice === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Missing required reservation fields (hotelId, roomId, checkIn, checkOut, totalPrice).',
      });
    }

    // 2. Lookup target Room in inventory (with fallback for demo static cards)
    let targetRoom = null;
    if (typeof roomRef === 'string' && roomRef.match(/^[0-9a-fA-F]{24}$/)) {
      targetRoom = await Room.findById(roomRef);
    }
    if (!targetRoom) {
      targetRoom = await Room.findOne({ $or: [{ propertyId: roomRef }, { roomNo: roomRef }] }) || await Room.findOne({});
    }
    if (!targetRoom) {
      return res.status(404).json({
        success: false,
        message: 'Selected room accommodation not found in hotel inventory.',
      });
    }

    // Lookup target Hotel ObjectId reference safely
    let targetHotel = null;
    if (typeof hotelRef === 'string' && hotelRef.match(/^[0-9a-fA-F]{24}$/)) {
      targetHotel = await Hotel.findById(hotelRef);
    }
    if (!targetHotel && targetRoom.hotelId) {
      targetHotel = await Hotel.findById(targetRoom.hotelId);
    }
    if (!targetHotel) {
      targetHotel = await Hotel.findOne({});
    }
    const finalHotelId = targetHotel ? targetHotel._id : targetRoom.hotelId;

    // 3. Check room availability & Prevent overbooking
    const requestedRooms = Number(rooms) || 1;
    if (
      targetRoom.availabilityStatus === 'Booked' ||
      targetRoom.availabilityStatus === 'Maintenance' ||
      (targetRoom.availableRooms !== undefined && targetRoom.availableRooms < requestedRooms)
    ) {
      return res.status(400).json({
        success: false,
        message: `Overbooking prevented: Insufficient rooms available for this accommodation type. Available quantity: ${targetRoom.availableRooms || 0}`,
      });
    }

    // 4. Reduce available room quantity after successful booking verification
    if (targetRoom.availableRooms !== undefined) {
      targetRoom.availableRooms -= requestedRooms;
      if (targetRoom.availableRooms <= 0) {
        targetRoom.availabilityStatus = 'Booked';
        targetRoom.status = 'Booked';
      }
      await targetRoom.save();
    }

    // 5. Create Booking document
    const newBooking = await Booking.create({
      user: req.user._id,
      hotel: finalHotelId,
      room: targetRoom._id,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      guests: guests || { adults: 2, children: 0 },
      rooms: requestedRooms,
      totalPrice: Number(totalPrice),
      bookingStatus: 'Confirmed',
      paymentStatus: paymentStatus || 'Pending',
      paymentMethod: paymentMethod || 'Credit Card',
      specialRequest: specialRequest || '',
    });

    // Populate references for rich frontend display
    const populatedBooking = await Booking.findById(newBooking._id)
      .populate('hotel', 'name location address mainImage starRating contactInfo')
      .populate('room', 'roomName roomNo roomType thumbnailImage pricePerNight');

    return res.status(201).json({
      success: true,
      message: 'Room reservation confirmed successfully and inventory quantity reduced.',
      data: populatedBooking || newBooking,
    });
  } catch (error) {
    console.error('Create Booking Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error occurred while creating booking reservation.',
      error: error.message,
    });
  }
};

// ============================================================================
// @desc    Get all bookings belonging to the currently logged-in user
// @route   GET /api/bookings/my-bookings
// @access  Private
// ============================================================================
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('hotel', 'name location address mainImage starRating')
      .populate('room', 'roomName roomNo roomType thumbnailImage pricePerNight')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.error('Get My Bookings Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve your booking reservations.',
      error: error.message,
    });
  }
};

// ============================================================================
// @desc    Get single booking details by MongoDB _id or alphanumeric bookingId
// @route   GET /api/bookings/:id
// @access  Private
// ============================================================================
export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    let query = {};
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      query = { $or: [{ _id: id }, { bookingId: id }] };
    } else {
      query = { bookingId: id };
    }

    const booking = await Booking.findOne(query)
      .populate('hotel')
      .populate('room')
      .populate('user', 'name email role phone');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking reservation not found.',
      });
    }

    // Security check: Ensure requesting user owns the booking or is an admin
    if (booking.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied: You are not authorized to view this reservation.',
      });
    }

    return res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.error('Get Booking By ID Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve booking details.',
      error: error.message,
    });
  }
};

// ============================================================================
// @desc    Cancel an existing booking and restore room quantity
// @route   PUT /api/bookings/cancel/:id
// @access  Private
// ============================================================================
export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    let query = {};
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      query = { $or: [{ _id: id }, { bookingId: id }] };
    } else {
      query = { bookingId: id };
    }

    const booking = await Booking.findOne(query);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking reservation not found for cancellation.',
      });
    }

    // Security check: Ensure requesting user owns the booking or is an admin
    if (booking.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied: You are not authorized to cancel this reservation.',
      });
    }

    if (booking.bookingStatus === 'Cancelled') {
      return res.status(400).json({
        success: false,
        message: 'This booking is already in a cancelled state.',
      });
    }

    // 1. Restore room inventory quantity
    const roomDoc = await Room.findById(booking.room);
    if (roomDoc) {
      const restoredQuantity = Number(booking.rooms) || 1;
      roomDoc.availableRooms = (roomDoc.availableRooms || 0) + restoredQuantity;
      if (roomDoc.availableRooms > 0 && roomDoc.availabilityStatus === 'Booked') {
        roomDoc.availabilityStatus = 'Available';
        roomDoc.status = 'Available';
      }
      await roomDoc.save();
    }

    // 2. Update booking reservation status
    booking.bookingStatus = 'Cancelled';
    if (booking.paymentStatus === 'Paid') {
      booking.paymentStatus = 'Refunded';
    }
    await booking.save();

    const updatedBooking = await Booking.findById(booking._id)
      .populate('hotel', 'name location address mainImage')
      .populate('room', 'roomName roomNo roomType');

    return res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully. Room inventory quantity has been restored.',
      data: updatedBooking || booking,
    });
  } catch (error) {
    console.error('Cancel Booking Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error occurred while cancelling booking.',
      error: error.message,
    });
  }
};

// ============================================================================
// @desc    Retrieve all system booking reservations with full payment records (Admin)
// @route   GET /api/bookings/all
// @access  Private (Authenticated / Admin Users)
// ============================================================================
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'fullName email phone role')
      .populate('hotel', 'name location city address mainImage')
      .populate('room', 'roomName roomNo roomType pricePerNight thumbnailImage')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.error('Fetch All Bookings Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error occurred while fetching system bookings.',
      error: error.message,
    });
  }
};
