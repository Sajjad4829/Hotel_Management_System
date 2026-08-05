import mongoose from 'mongoose';

/**
 * Hotel Model
 * Booking.com style structure representing properties managed by administrators.
 * Designed with dual field aliasing to maintain backwards compatibility with existing frontend state.
 */
const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Hotel Name is required'],
      trim: true,
    },
    slug: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: 'Premium luxury hotel resort with exquisite architecture and exceptional service.',
    },
    location: {
      type: String,
      default: 'Coxs Bazar, Bangladesh',
    },
    address: {
      type: String,
      default: 'Prime City Center Location, Bangladesh',
    },
    destination: {
      type: String,
      default: 'dest-dhaka',
    },
    destinationId: {
      type: String,
      default: 'dest-dhaka',
    },
    category: {
      type: String,
      default: '5-Star Luxury',
    },
    starRating: {
      type: Number,
      default: 5,
    },
    rating: {
      type: String,
      default: '4.9/5',
    },
    contactInfo: {
      phone: { type: String, default: '+880 1711-000000' },
      email: { type: String, default: 'reservations@aurumhotels.com' },
    },
    checkInTime: {
      type: String,
      default: '2:00 PM (14:00)',
    },
    checkOutTime: {
      type: String,
      default: '12:00 PM (12:00)',
    },
    facilities: [
      {
        type: String,
      },
    ],
    amenities: [
      {
        type: String,
      },
    ],
    mainImage: {
      type: String,
      default: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80',
    },
    image: {
      type: String,
    },
    galleryImages: [
      {
        type: String,
      },
    ],
    gallery: [
      {
        type: String,
      },
    ],
    price: {
      type: Number,
      default: 150,
    },
    originalPrice: {
      type: Number,
      default: 200,
    },
    reviewCount: {
      type: Number,
      default: 124,
    },
    distanceFromCenter: {
      type: String,
      default: '2.5 km from center',
    },
    tag: {
      type: String,
      default: '',
    },
    tagColor: {
      type: String,
      default: '#2C4A6E',
    },
    breakfast: {
      type: Boolean,
      default: true,
    },
    freeCancellation: {
      type: Boolean,
      default: true,
    },
    payAtProperty: {
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
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual relationship linking Hotel to all Rooms belonging to this property
hotelSchema.virtual('rooms', {
  ref: 'Room',
  localField: '_id',
  foreignField: 'hotelId',
});

// Sync aliases before saving (Synchronous hook without legacy callback for Mongoose 8 compatibility)
hotelSchema.pre('save', function () {
  if (!this.image) this.image = this.mainImage;
  if (!this.mainImage && this.image) this.mainImage = this.image;
  if (this.gallery && (!this.galleryImages || this.galleryImages.length === 0)) {
    this.galleryImages = this.gallery;
  }
  if (this.facilities && (!this.amenities || this.amenities.length === 0)) {
    this.amenities = this.facilities;
  }
  if (!this.destinationId && this.destination) this.destinationId = this.destination;
  if (!this.destination && this.destinationId) this.destination = this.destinationId;
});

const Hotel = mongoose.models.Hotel || mongoose.model('Hotel', hotelSchema);

export default Hotel;
