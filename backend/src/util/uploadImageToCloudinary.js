  import cloudinary from 'cloudinary';
import streamifier from 'streamifier';
import { CLOUDINARY_CLOUD_NAME,CLOUDINARY_API_KEY,CLOUDINARY_API_SECRET } from '../config/config.js';
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

export const uploadImageToCloudinary = async (buffer, width) => {
  try {
    return new Promise((resolve, reject) => {
      const cld_upload_stream = cloudinary.uploader.upload_stream({ 
        resource_type: "image",
        folder: "dobby/images",
        format: 'png' 
      }, (error, result) => {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          console.log(result);
          resolve(result);
        }
      });
      
      streamifier.createReadStream(buffer).pipe(cld_upload_stream);
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

