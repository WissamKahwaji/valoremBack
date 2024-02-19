import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  customerName: String,
  customerImg: String,
  review: String,
});

export const ReviewModel = mongoose.model("reviews", reviewSchema);
