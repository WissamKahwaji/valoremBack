import mongoose from "mongoose";

const brandCollaborationSchema = new mongoose.Schema({
  name: String,
  logo: String,
});

export const BrandCollaborationModel = mongoose.model(
  "BrandCollaboration",
  brandCollaborationSchema
);
