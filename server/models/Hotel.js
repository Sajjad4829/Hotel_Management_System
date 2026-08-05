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
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    location: {
      type: String,
      default: 'Coxs Bazar, Bangladesh',
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
    },
    destination: {
      type: String,
      default: 'dest-dhaka', // Can store destination ID or city name
    },
    starRating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    rating: {
      type: String,
      default: '4.9/5', // Backward compatible frontend rating display string
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
        type: String, // Backward compatible array with existing frontend property context
      },
    ],
    mainImage: {
      type: String,
      required: [true, 'Main Hotel Image URL is required'],
    },
    image: {
      type: String, // Alias for mainImage
    },
    galleryImages: [
      {
        type: String,
      },
    ],
    gallery: [
      {
        type: String, // Alias for galleryImages
      },
    ],
    price: {
      type: Number,
      default: 150, // Default baseline room rate for search results display
    },
    originalPrice: {
      type: Number,
      default: 200,
    },
    reviewCount: {
      type: Number,
      default: 124,
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

// Sync aliases before saving
hotelSchema.pre('save', function (next) {
  if (!this.image) this.image = this.mainImage;
  if (!this.mainImage && this.image) this.mainImage = this.image;
  if (this.gallery && (!this.galleryImages || this.galleryImages.length === 0)) {
    this.galleryImages = this.gallery;
  }
  if (this.facilities && (!this.amenities || this.amenities.length === 0)) {
    this.amenities = this.facilities;
  }
  next();
});

const Hotel = mongoose.models.Hotel || mongoose.model('Hotel', hotelSchema);

export default Hotel;
