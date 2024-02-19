import mongoose from "mongoose";

const colorsModelSchema = new mongoose.Schema({
  mainColor: String,
  navColor: String,
  linear: String,
  secondaryColor: String,
});

export const ColorsModel = mongoose.model("Colors", colorsModelSchema);
