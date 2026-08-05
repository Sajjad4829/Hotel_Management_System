import mongoose from 'mongoose';

/**
 * Booking Model
 * Represents hotel room reservations made by authenticated customers.
 * Tracks reservation status, payment state, dates, and inventory quantity.
 */
const bookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      unique: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required for booking reservation'],
    },
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hotel',
      required: [true, 'Hotel property ID is required'],
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
      required: [true, 'Room ID is required'],
    },
    checkIn: {
      type: Date,
      required: [true, 'Check-in date is required'],
    },
    checkOut: {
      type: Date,
      required: [true, 'Check-out date is required'],
    },
    guests: {
      type: mongoose.Schema.Types.Mixed,
      default: { adults: 2, children: 0 }, // Supports both numeric counts and structured { adults, children } objects
    },
    rooms: {
      type: Number,
      required: [true, 'Number of rooms is required'],
      default: 1,
      min: [1, 'At least one room must be booked'],
    },
    totalPrice: {
      type: Number,
      required: [true, 'Total reservation price is required'],
      min: 0,
    },
    bookingStatus: {
      type: String,
      enum: ['Confirmed', 'Cancelled', 'Pending', 'Completed'],
      default: 'Confirmed',
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Paid', 'Refunded', 'Failed'],
      default: 'Pending',
    },
    paymentMethod: {
      type: String,
      default: 'Credit Card',
    },
    specialRequest: {
      type: String,
      default: '',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Synchronous Mongoose 8+ hook to auto-generate unique alphanumeric bookingId before creation
bookingSchema.pre('save', function () {
  if (!this.bookingId) {
    const timestampCode = Date.now().toString(36).toUpperCase().slice(-4);
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    this.bookingId = `BK-${timestampCode}-${randomCode}`;
  }
});

const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

export default Booking;
