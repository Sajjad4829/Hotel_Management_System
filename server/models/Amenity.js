import mongoose from 'mongoose';

/**
 * Amenity Model
 * Catalog of standardized luxury facilities for Hotel properties and Room accommodations.
 */
const amenitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Amenity Name is required'],
      trim: true,
      unique: true,
    },
    type: {
      type: String,
      enum: ['hotel', 'room', 'both'],
      default: 'hotel',
      required: [true, 'Amenity type (hotel or room) is required'],
    },
    icon: {
      type: String,
      default: 'FiCheck', // Default React Icon identifier string
    },
    description: {
      type: String,
      default: 'Standard luxury amenity facility.',
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

const Amenity = mongoose.models.Amenity || mongoose.model('Amenity', amenitySchema);

export default Amenity;
