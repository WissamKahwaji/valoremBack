import mongoose from "mongoose";

const propertyTypeSchema = new mongoose.Schema({
  name: String,
  img: String,
  properties: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "property",
    },
  ],
});

export const propertyTypeModel = mongoose.model(
  "propertyType",
  propertyTypeSchema
);
