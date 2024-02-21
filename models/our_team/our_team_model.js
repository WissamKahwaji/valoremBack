import mongoose from "mongoose";

const ourTeamSchema = new mongoose.Schema({
  title: String,
  description: String,
  team: [
    {
      name: String,
      jobTitle: String,
      img: String,
      brief: String,
    },
  ],
});

export const OurTeamModel = mongoose.model("ourTeam", ourTeamSchema);
