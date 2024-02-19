import { StatisticsModel } from "../models/statistics/statistics_model.js";

export const getStatisticsData = async (req, res, next) => {
  try {
    const statisticsData = await StatisticsModel.find();
    return res.status(200).json(statisticsData);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const addStatisticsData = async (req, res, next) => {
  try {
    const { title, number, description } = req.body;

    const newStatisticsData = new StatisticsModel({
      title,
      number,
      description,
    });

    const savedStatisticsData = await newStatisticsData.save();

    return res.status(201).json(savedStatisticsData);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const editStatisticsData = async (req, res, next) => {
  try {
    const { statisticsId } = req.params;
    const { title, number, description } = req.body;

    const updatedStatisticsData = await StatisticsModel.findByIdAndUpdate(
      statisticsId,
      {
        title,
        number,
        description,
      },
      { new: true }
    );

    if (!updatedStatisticsData) {
      const error = new Error("Statistics data not found");
      error.statusCode = 404;
      throw error;
    }

    return res.status(200).json(updatedStatisticsData);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const deleteStatisticsData = async (req, res, next) => {
  try {
    const { statisticsId } = req.params;

    const deletedStatisticsData = await StatisticsModel.findByIdAndDelete(
      statisticsId
    );

    if (!deletedStatisticsData) {
      const error = new Error("Statistics data not found");
      error.statusCode = 404;
      throw error;
    }

    return res
      .status(200)
      .json({ message: "Statistics data deleted successfully" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
