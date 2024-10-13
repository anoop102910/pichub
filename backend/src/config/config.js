import dotenv from 'dotenv';
dotenv.config();

export const DB_URI = process.env.DB_URI;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const CLIENT_URI = process.env.CLIENT_URI;
export const SERVER_URI = process.env.SERVER_URI;
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
export const EMAILJS_PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY;
export const EMAILJS_PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY;
