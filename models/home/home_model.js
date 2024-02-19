import mongoose from "mongoose";

const homeSchema = new mongoose.Schema({
  landingImg: String,
  brandName: String,
  brandDesc: String,
  logoImg: String,
});

export const homeModel = mongoose.model("home", homeSchema);
