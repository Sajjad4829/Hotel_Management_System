import { uploadToCloudinary, deleteFromCloudinary } from '../config/cloudinary.js';

// ============================================================================
// @desc    Upload single image or multiple images to Cloudinary (No Local Disk Storage)
// @route   POST /api/upload
// @access  Private / Admin
// ============================================================================
export const uploadImages = async (req, res) => {
  try {
    if (!req.file && (!req.files || req.files.length === 0)) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided in request payload.',
      });
    }

    const folderName = req.body.folder || 'hotel_management_gallery';
    const uploadResults = [];

    if (req.file) {
      // Single file upload via buffer stream
      const result = await uploadToCloudinary(req.file.buffer, folderName);
      uploadResults.push({
        url: result.secure_url,
        public_id: result.public_id,
        originalName: req.file.originalname,
      });
    }

    if (req.files && req.files.length > 0) {
      // Multiple file parallel buffer upload
      const uploadPromises = req.files.map(file => uploadToCloudinary(file.buffer, folderName));
      const results = await Promise.all(uploadPromises);
      results.forEach((result, index) => {
        uploadResults.push({
          url: result.secure_url,
          public_id: result.public_id,
          originalName: req.files[index].originalname,
        });
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Images successfully uploaded directly to remote Cloudinary storage.',
      data: uploadResults.length === 1 ? uploadResults[0] : uploadResults,
      urls: uploadResults.map(r => r.url),
    });
  } catch (error) {
    console.error('Image Upload Controller Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to upload image(s) to remote server.',
      error: error.message || 'Unknown stream upload error',
    });
  }
};

// ============================================================================
// @desc    Delete image from Cloudinary
// @route   DELETE /api/upload
// @access  Private / Admin
// ============================================================================
export const deleteImage = async (req, res) => {
  try {
    const { public_id } = req.body;

    if (!public_id) {
      return res.status(400).json({
        success: false,
        message: 'Cloudinary public_id parameter is required for deletion.',
      });
    }

    const result = await deleteFromCloudinary(public_id);

    return res.status(200).json({
      success: true,
      message: 'Image asset deleted from Cloudinary storage.',
      result,
    });
  } catch (error) {
    console.error('Delete Image Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete remote image.',
    });
  }
};
