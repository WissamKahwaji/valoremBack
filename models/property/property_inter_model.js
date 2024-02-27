import mongoose from "mongoose";

const propertyInterContentSchema = new mongoose.Schema({
  title: String,
  description: String,
  img: String,
});

const propertyInterSchema = new mongoose.Schema({
  name: String,
  img: String,
  coverImg: String,
  bio: String,
  description: String,
  location: String,
  price: Number,
  propertyInterContent: [propertyInterContentSchema.obj],
  gallery: [String],
  paymentPlan: String,
  floorPlan: String,
  masterPlan: String,
});

export const propertyInterModel = mongoose.model(
  "propertyInter",
  propertyInterSchema
);
