import mongoose from "mongoose";

const propertyContentSchema = new mongoose.Schema({
  title: String,
  description: String,
  details: [
    {
      title: String,
      icon: String,
    },
  ],
  imgs: [String],
});

const propertySchema = new mongoose.Schema({
  name: String,
  img: String,
  coverImg: String,
  bio: String,
  description: String,
  location: String,
  price: Number,
  bedrooms: Number,
  bathrooms: Number,
  space: String,
  propertyType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "propertyType",
  },
  propertyContent: [propertyContentSchema.obj],
  gallery: [String],
  breifDetails: [
    {
      icon: String,
      title: String,
      value: String,
    },
  ],
  locationDetails: String,
  connectivity: [
    {
      title: String,
      value: String,
    },
  ],
  paymentPlan: String,
  floorPlan: String,
  masterPlan: String,
});

export const propertyModel = mongoose.model("property", propertySchema);
