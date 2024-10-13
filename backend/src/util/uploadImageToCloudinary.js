import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export const uploadImage = async (buffer, folder = "pichub/images", format = "jpg") => {
  try {
    return await uploadFile(buffer, folder, format).then((data) => data);
  } catch (error) {
    throw error;
  }
};

const uploadFile = async (buffer, folder = "pichub", format = "jpg") => {
  try {
    return new Promise((resolve, reject) => {
      const cld_upload_stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
          folder: folder,
        },
        (error, result) => {
          if (error) {
            console.error(error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      streamifier.createReadStream(buffer).pipe(cld_upload_stream);
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
