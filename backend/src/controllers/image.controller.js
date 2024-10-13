import Joi from "joi";
import Image from "../models/image.model.js";
import { uploadImage } from "../util/uploadImageToCloudinary.js";

const imageSchema = Joi.object({
  title: Joi.string().required(),
  desc: Joi.string(),
  tags: Joi.array().items(Joi.string()),
});

export const postImage = async (req, res) => {
  try {
    console.log("POST IMAGE");
    const image = req.files.image;
    const userId = req.userId;
    console.log(userId);

    const { error, value } = imageSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });
    const { title, desc, tags } = value;

    console.log("Uploading image to cloudinary");
    const { url, width, height } = await uploadImage(image.data);
    console.log(width, height, url);
    console.log("Image uploaded to cloudinary");
    const path = url.split("/").pop();
    const newImage = new Image({ userId, title, imageUrl: path, desc, tags, width, height });
    const response = await newImage.save();
    console.log("Image created successfully");
    res.status(201).json({ data: response, message: "Image created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const incrementViews = async (req, res) => {
  try {
    console.log("POST INCREMENT VIEWS");
    const { id } = req.params;
    await Image.findByIdAndUpdate(id, { $inc: { views: 1 } });
    res.status(200).json({ message: "Views incremented successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getImages = async (req, res) => {
  const { search, limit = 10, page = 1 } = req.query;
  try {
    const query = {};
    if (search) query.title = new RegExp(search, "i");

    const count = await Image.countDocuments(query);
    const images = await Image.find(query)
      .limit(Number(limit))
      .skip(Number(limit) * (Number(page) - 1))
      .exec();

    res.status(200).json({
      message: "Image fetch success",
      data: images,
      page,
      limit,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
