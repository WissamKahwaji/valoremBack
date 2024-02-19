import mongoose from "mongoose";

const logoSchema = new mongoose.Schema({
  logoData: String,
  mainLogo: String,
});

export const logoModel = mongoose.model("logo", logoSchema);
