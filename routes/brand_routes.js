import express from "express";

import auth from "../middlewares/auth.js";
import {
  addBrandsData,
  deleteBrand,
  editBrandData,
  getBrandsData,
} from "../controllers/brand_ctrl.js";

const router = express.Router();

router.get("/", getBrandsData);
router.post("/", addBrandsData);
router.put("/:brandId", editBrandData);
router.delete("/:brandId", deleteBrand);

export default router;
