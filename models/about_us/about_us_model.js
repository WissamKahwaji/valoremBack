import mongoose from "mongoose";

const aboutContentSchema = new mongoose.Schema({
  title: String,
  description: String,
  img: String,
});

const ourValuesSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const aboutUsSchema = new mongoose.Schema({
  title: String,
  img: String,
  brief: {
    title: String,
    description: String,
  },
  content: [aboutContentSchema.obj],
  ourValues: [ourValuesSchema.obj],
});

export const aboutUsModel = mongoose.model("aboutUs", aboutUsSchema);
