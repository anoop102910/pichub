import Joi from "joi";
import Image from "../models/image.model.js";
import { uploadImageToCloudinary } from "../util/uploadImageToCloudinary.js";

const imageSchema = Joi.object({
  name: Joi.string().required(),
  desc: Joi.string(),
});

export const postImage = async (req, res) => {
  try {
    const image = req.files.image;
    const userId = req.userId;

    const { error, value } = imageSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });
    const { name, desc } = value;

    const { url } = await uploadImageToCloudinary(image.data);
    const path = url.split("/").pop();
    const newImage = new Image({ userId, name, imageUrl: path, desc });
    const response = await newImage.save();

    res.json(response);
  } catch (error) {
    console.log(error);
    res.json(error.message);
  }
};

export const incrementViews = async (req, res) => {
  try {
    console.log("POST INCREMENT VIEWS");
    const { id } = req.params;
    await Image.findByIdAndUpdate(id, { $inc: { views: 1 } });
    res.json({ message: "Views incremented successfully" });
  } catch (error) {
    res.json(error.message);
  }
};

export const getImages = async (req, res) => {
  const { search, limit = 10, page = 1 } = req.query;
  try {
    const query = {};
    if (search) query.name = new RegExp(search, "i");

    const count = await Image.countDocuments(query);
    const images = await Image.find(query)
      .limit(Number(limit))
      .skip(Number(limit) * (Number(page) - 1))
      .exec();

    res.json({
      message: "Image fetch success",
      data: images,
      page,
      limit,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

