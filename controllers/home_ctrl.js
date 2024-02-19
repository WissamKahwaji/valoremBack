import { homeModel } from "../models/home/home_model.js";

export const getHomeData = async (req, res, next) => {
  try {
    const homeData = await homeModel.findOne();

    return res.status(200).json(homeData);
  } catch (error) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const addHomeData = async (req, res, next) => {
  try {
    const { brandName, brandDesc } = req.body;

    const landingImg = req.files["landingImg"][0].path;
    const logoImg = req.files["logoImg"][0].path;

    const urlLandingImg =
      `${process.env.BASE_URL}` + landingImg.replace(/\\/g, "/");
    const urlLogoImg = `${process.env.BASE_URL}` + logoImg.replace(/\\/g, "/");

    const newHomeData = new homeModel({
      landingImg: urlLandingImg,
      brandName,
      brandDesc,
      logoImg: urlLogoImg,
    });

    await newHomeData.save();

    return res.status(201).json({
      message: "Home data added successfully",
      data: newHomeData,
    });
  } catch (error) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
