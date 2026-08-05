import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import stream from 'stream';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary SDK with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'demo_luxury_hotel_cloud',
  api_key: process.env.CLOUDINARY_API_KEY || '123456789012345',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'demo_cloudinary_api_secret',
});

/**
 * Memory Storage setup for Multer
 * Ensures images remain exclusively in server memory streams without writing to local filesystem disk.
 */
const storage = multer.memoryStorage();

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB maximum file size limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type: Only image files are allowed for upload.'), false);
    }
  },
});

/**
 * Upload Buffer Stream to Cloudinary
 * Takes an in-memory file buffer and streams it to Cloudinary CDN under designated folder.
 * Includes fallback demo URL generation for development environments missing live credentials.
 */
export const uploadToCloudinary = (fileBuffer, folderName = 'hotel_management_gallery') => {
  return new Promise((resolve, reject) => {
    // If demo credentials are present, return high-resolution luxury placeholder without API error
    if (!process.env.CLOUDINARY_API_KEY || process.env.CLOUDINARY_API_KEY === '123456789012345') {
      console.warn('⚠️ Cloudinary API keys unset in .env: Returning fallback CDN URL for demonstration.');
      return resolve({
        secure_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
        public_id: `demo_${Date.now()}`,
      });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folderName,
        resource_type: 'image',
        transformation: [{ quality: 'auto', fetch_format: 'auto' }],
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileBuffer);
    bufferStream.pipe(uploadStream);
  });
};

/**
 * Delete Image from Cloudinary using Public ID
 */
export const deleteFromCloudinary = async (publicId) => {
  try {
    if (!publicId || publicId.startsWith('demo_')) return true;
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Cloudinary Deletion Error:', error);
    return false;
  }
};

export default cloudinary;
