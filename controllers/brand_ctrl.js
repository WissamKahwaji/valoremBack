import { BrandCollaborationModel } from "../models/brand_collaboration/brand_collaboration_model.js";
import dotenv from "dotenv";

dotenv.config();

export const getBrandsData = async (req, res, next) => {
  try {
    const brandsData = await BrandCollaborationModel.find();
    return res.status(200).json(brandsData);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 400;
    }
    next(err);
  }
};

export const addBrandsData = async (req, res, next) => {
  try {
    const { name } = req.body;
    const logoPath =
      req.files && req.files["logoImg"] ? req.files["logoImg"][0].path : null;
    const newBrand = new BrandCollaborationModel({
      name,
      logo: logoPath
        ? `${process.env.BASE_URL}${logoPath.replace(/\\/g, "/")}`
        : null,
    });
    const savedBrand = await newBrand.save();
    return res.status(201).json(savedBrand);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 400;
    }
    next(err);
  }
};

export const editBrandData = async (req, res, next) => {
  try {
    const { brandId } = req.params;
    const { name } = req.body;
    const brand = await BrandCollaborationModel.findById(brandId);
    if (!brand) {
      const error = new Error("Brand not found");
      error.statusCode = 404;
      throw error;
    }
    if (name) brand.name = name;
    if (req.files && req.files["logoImg"]) {
      const imgPath = req.files["logoImg"][0].path;
      brand.logo = `${process.env.BASE_URL}` + imgPath.replace(/\\/g, "/");
    }
    const updatedBrand = await brand.save();
    return res.status(200).json(updatedBrand);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 400;
    }
    next(err);
  }
};
export const deleteBrand = async (req, res, next) => {
  try {
    const { brandId } = req.params;
    const deletedBrand = await BrandCollaborationModel.findByIdAndDelete(
      brandId
    );
    if (!deletedBrand) {
      const error = new Error("Brand not found");
      error.statusCode = 404;
      throw error;
    }
    return res.status(200).json({ message: "Brand data deleted successfully" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 400;
    }
    next(err);
  }
};
