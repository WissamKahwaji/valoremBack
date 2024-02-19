import { ColorsModel } from "../models/colors/colors_model.js";

export const getColors = async (req, res, next) => {
  try {
    const colors = await ColorsModel.findOne();
    return res.status(200).json({
      message: "Success",
      data: colors,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const addColors = async (req, res, next) => {
  try {
    const { mainColor, navColor, linear, secondaryColor } = req.body;

    const newColor = new ColorsModel({
      mainColor,
      navColor,
      linear,
      secondaryColor,
    });

    await newColor.save();

    return res.status(201).json({
      message: "Color added successfully",
      data: newColor,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const editColors = async (req, res, next) => {
  try {
    const { mainColor, navColor, linear, secondaryColor } = req.body;
    const updatedData = {};

    if (mainColor) {
      updatedData.mainColor = mainColor;
    }
    if (navColor) {
      updatedData.navColor = navColor;
    }
    if (linear) {
      updatedData.linear = linear;
    }
    if (secondaryColor) {
      updatedData.secondaryColor = secondaryColor;
    }

    const colors = await ColorsModel.findOne();
    if (!colors) {
      const error = new Error("Colors not found.");
      error.statusCode = 404;
      throw error;
    }

    colors.set(updatedData);
    await colors.save();

    return res.status(200).json({
      message: "Colors updated successfully",
      data: colors,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
