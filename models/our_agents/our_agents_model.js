import mongoose from "mongoose";

const ourAgentsSchema = new mongoose.Schema({
  name: String,
  logo: String,
});

export const OurAgentsModel = mongoose.model("ourAgents", ourAgentsSchema);
