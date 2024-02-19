import express from "express";

import auth from "../middlewares/auth.js";
import {
  addOfferData,
  deleteOfferData,
  editOfferData,
  getOfferById,
  getOffersData,
} from "../controllers/offers_ctrl.js";

const router = express.Router();

router.get("/", getOffersData);
router.get("/:id", getOfferById);
router.post("/add", addOfferData);
router.put("/edit/:id", editOfferData);
router.delete("/delete/:id", deleteOfferData);

export default router;
