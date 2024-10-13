import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User id is required"],
  },
  title: {
    type: String,
    required: [true, "Name is required"],
    minlength: 3,
  },
  desc: {
    type: String,
    required: [true, "Description is required"],
  },
  tags: {
    type: [String],
    required: [true, "Tags are required"],
  },
  imageUrl: {
    type: String,
    required: [true, "Image url is required"],
  },
  width: {
    type: Number,
  },
  height: {
    type: Number,
  },
  views: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Image", imageSchema);
