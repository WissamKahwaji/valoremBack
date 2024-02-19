import { logoModel } from "../models/logo/logo_model.js";

export const getLogoData = async (req, res, next) => {
  try {
    const logoData = await logoModel.findOne();

    return res.status(200).json(logoData);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const addLogoData = async (req, res, next) => {
  try {
    const logoImgPath =
      req.files && req.files["logoImg"] ? req.files["logoImg"][0].path : null;
    const logoUrlImg = logoImgPath
      ? "https://beirutback.siidevelopment.com/" +
        logoImgPath.replace(/\\/g, "/")
      : null;

    const mainLogoImgPath =
      req.files && req.files["mainLogoImg"]
        ? req.files["mainLogoImg"][0].path
        : null;
    const mainLogUrlImg = mainLogoImgPath
      ? "https://beirutback.siidevelopment.com/" +
        mainLogoImgPath.replace(/\\/g, "/")
      : null;

    const newLogoData = new logoModel({
      logoData: logoUrlImg,
      mainLogo: mainLogUrlImg,
    });

    await newLogoData.save();

    return res.status(201).json("Logo data added successfully");
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
