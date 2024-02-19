import { AchievementsModel } from "../models/achievements/achievements_model.js";
import dotenv from "dotenv";

dotenv.config();

export const getAchievementsData = async (req, res, next) => {
  try {
    const achievementsData = await AchievementsModel.find();

    return res.status(200).json(achievementsData);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const addAchievementsData = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const newAchievements = new AchievementsModel({
      name,
      description,
    });
    if (req.files["imgs"]) {
      const achievementsImages = req.files["imgs"];
      const imageUrls = [];
      if (!achievementsImages || !Array.isArray(achievementsImages)) {
        return res
          .status(404)
          .json({ message: "Attached files are missing or invalid." });
      }

      for (const image of achievementsImages) {
        if (!image) {
          return res
            .status(404)
            .json({ message: "Attached file is not an image." });
        }

        const imageUrl =
          `${process.env.BASE_URL}` + image.path.replace(/\\/g, "/");
        imageUrls.push(imageUrl);
      }
      newAchievements.imgs = imageUrls;
    }
    const savedAchievements = await newAchievements.save();
    return res.status(201).json(savedAchievements);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const editAchievementsData = async (req, res, next) => {
  try {
    const { achievementsId } = req.params;
    const { name, description } = req.body;

    const achievements = await AchievementsModel.findById(achievementsId);

    if (!achievements) {
      return res.status(404).json({ message: "Achievements not found" });
    }

    if (name) {
      achievements.name = name;
    }

    if (description) {
      achievements.description = description;
    }
    if (req.files && req.files["imgs"]) {
      const achievementsImages = req.files["imgs"];
      const imageUrls = [];

      if (!achievementsImages || !Array.isArray(achievementsImages)) {
        return res
          .status(404)
          .json({ message: "Attached files are missing or invalid." });
      }

      for (const image of achievementsImages) {
        if (!image) {
          return res
            .status(404)
            .json({ message: "Attached file is not an image." });
        }

        const imageUrl = `${process.env.BASE_URL}${image.path.replace(
          /\\/g,
          "/"
        )}`;
        imageUrls.push(imageUrl);
      }

      achievements.imgs = imageUrls;
    }

    const updatedAchievements = await achievements.save();

    return res.status(200).json(updatedAchievements);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const deleteAchievementsData = async (req, res, next) => {
  try {
    const { achievementsId } = req.params;

    const deletedAchievements = await AchievementsModel.findByIdAndDelete(
      achievementsId
    );

    if (!deletedAchievements) {
      return res.status(404).json({ message: "Achievements not found" });
    }

    return res
      .status(200)
      .json({ message: "Achievements deleted successfully" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
