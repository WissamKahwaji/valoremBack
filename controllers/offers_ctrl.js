import { OffersModel } from "../models/offers/offers_model.js";
import { propertyModel } from "../models/property/property_model.js";

export const getOffersData = async (req, res, next) => {
  try {
    const offersData = await OffersModel.find().populate("property");
    return res.status(200).json(offersData);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 400;
    }
    next(err);
  }
};

export const getOfferById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const offer = await OffersModel.findById(id).populate("property");
    return res.status(200).json(offer);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 400;
    }
    next(err);
  }
};

export const addOfferData = async (req, res, next) => {
  try {
    const { property, amount, endDate } = req.body;
    const propertyData = await propertyModel.findById(property);
    if (!propertyData) {
      const error = new Error("Property not found");
      error.statusCode = 404;
      throw error;
    }
    const newOffer = new OffersModel({
      property,
      amount,
      endDate,
    });
    const savedOffer = await newOffer.save();
    return res.status(201).json(savedOffer);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 400;
    }
    next(err);
  }
};

export const editOfferData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { amount, endDate } = req.body;

    const editedDate = {};
    if (amount) editedDate.amount = amount;
    if (endDate) editedDate.endDate = endDate;
    const updatedOffer = await OffersModel.findByIdAndUpdate(id, editedDate, {
      new: true,
    });

    if (!updatedOffer) {
      return res.status(404).json({ message: "Offer not found" });
    }

    return res.status(200).json(updatedOffer);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 400;
    }
    next(err);
  }
};

export const deleteOfferData = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedOffer = await OffersModel.findByIdAndDelete(id);

    if (!deletedOffer) {
      return res.status(404).json({ message: "Offer not found" });
    }

    const propertyData = await propertyModel.findByIdAndDelete(
      deletedOffer.property
    );

    if (!propertyData) {
      return res.status(404).json({ message: "Associated property not found" });
    }

    return res
      .status(200)
      .json({ message: "Offer and associated property deleted successfully" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 400;
    }
    next(err);
  }
};
