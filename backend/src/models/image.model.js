import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User id is required"],
  },
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: 3,
  },
  desc: {
    type: String,
    required: [true, "Description is required"],
  },
  imageUrl: {
    type: String,
    required: [true, "Image url is required"],
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

export default mongoose.model("Post", postSchema);
