import mongoose from 'mongoose';

/**
 * Room Model
 * Relational model linking inventory units directly to parent Hotel documents via MongoDB ObjectId.
 */
const roomSchema = new mongoose.Schema(
  {
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hotel',
      required: false, // Optional on initial creation if using legacy string IDs, but recommended via ObjectId
    },
    propertyId: {
      type: String, // Backward compatibility with existing frontend room cards (e.g., 'dhaka-gulshan' or Hotel ObjectId string)
      default: '',
    },
    roomName: {
      type: String,
      required: [true, 'Room Name is required'],
      trim: true,
    },
    roomNo: {
      type: String,
      default: '101',
    },
    roomType: {
      type: String,
      default: 'Deluxe',
    },
    type: {
      type: String, // Alias for roomType
      default: 'Deluxe',
    },
    description: {
      type: String,
      default: 'An exquisitely styled luxury accommodation featuring serene ambiance and premium bedding.',
    },
    shortDescription: {
      type: String,
      default: 'A beautifully appointed room with stunning views.',
    },
    pricePerNight: {
      type: Number,
      default: 150,
    },
    price: {
      type: Number, // Alias for pricePerNight
      default: 150,
    },
    discountPrice: {
      type: Number,
      default: 0,
    },
    capacity: {
      adults: { type: Number, default: 2 },
      children: { type: Number, default: 1 },
    },
    maxAdults: {
      type: Number,
      default: 2,
    },
    maxChildren: {
      type: Number,
      default: 1,
    },
    bedType: {
      type: String,
      default: 'King',
    },
    roomSize: {
      type: Number,
      default: 450,
    },
    amenities: [
      {
        type: String,
      },
    ],
    roomImages: [
      {
        type: String,
      },
    ],
    thumbnailImage: {
      type: String,
      default: 'https://images.unsplash.com/photo-1542314831-c6a4d27ce66f?auto=format&fit=crop&w=800&q=80',
    },
    totalRooms: {
      type: Number,
      default: 5, // Total units of this room type in the hotel inventory
      min: 0,
    },
    availableRooms: {
      type: Number,
      default: 5, // Active inventory quantity available for booking
      min: 0,
    },
    availabilityStatus: {
      type: String,
      default: 'Available',
    },
    status: {
      type: String, // Alias for availabilityStatus
      default: 'Available',
    },
    floor: {
      type: String,
      default: '1',
    },
    isFeatured: {
      type: Boolean,
      default: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save validation to sync aliases and string representations (Synchronous Mongoose 8 compatible)
roomSchema.pre('save', function () {
  if (!this.price && this.pricePerNight) this.price = this.pricePerNight;
  if (!this.pricePerNight && this.price) this.pricePerNight = this.price;
  if (this.availableRooms !== undefined && this.availableRooms <= 0) {
    this.availabilityStatus = 'Booked';
    this.status = 'Booked';
  } else if (this.availableRooms > 0 && this.availabilityStatus === 'Booked') {
    this.availabilityStatus = 'Available';
    this.status = 'Available';
  }
  if (this.availabilityStatus && !this.status) this.status = this.availabilityStatus;
  if (this.status && !this.availabilityStatus) this.availabilityStatus = this.status;
  if (this.roomType && !this.type) this.type = this.roomType;
  if (this.hotelId && (!this.propertyId || this.propertyId === '')) {
    this.propertyId = this.hotelId.toString();
  }
});

const Room = mongoose.models.Room || mongoose.model('Room', roomSchema);

export default Room;
