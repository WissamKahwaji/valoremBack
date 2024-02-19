import mongoose from "mongoose";

const statisticsSchema = new mongoose.Schema({
  title: String,
  number: String,
  description: String,
});

export const StatisticsModel = mongoose.model("Statistics", statisticsSchema);
