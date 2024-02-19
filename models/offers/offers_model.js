import mongoose from "mongoose";

const offersSchema = new mongoose.Schema({
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "property",
  },
  amount: Number,
  endDate: String,
});

export const OffersModel = mongoose.model("Offers", offersSchema);
