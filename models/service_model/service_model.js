import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  title: String,
  img: String,
  content: [
    {
      title: String,
      description: String,
    },
  ],
});

export const ServiceModel = mongoose.model("service", serviceSchema);
