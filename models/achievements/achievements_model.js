import mongoose from "mongoose";

const achievementsSchema = new mongoose.Schema({
  name: String,
  description: String,
  imgs: [String],
});

export const AchievementsModel = mongoose.model(
  "achievements",
  achievementsSchema
);
