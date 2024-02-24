import express from "express";

import auth from "../middlewares/auth.js";
import {
  addAboutData,
  addContentItem,
  addOurValuesItem,
  deleteContentItem,
  deleteOurValuesItem,
  editAboutData,
  editContentItem,
  editOurValuesItem,
  getAboutData,
} from "../controllers/about_us_ctrl.js";

const router = express.Router();

router.get("/", getAboutData);
router.post("/", addAboutData);
router.put("/edit", editAboutData);
router.post("/add-content", addContentItem);
router.put("/edit-content/:contentItemId", editContentItem);
router.delete("/delete-content-item/:contentItemId", deleteContentItem);

router.post("/add-our-value-item", addOurValuesItem);
router.put("/edit-our-value-item/:ourValueItemId", editOurValuesItem);
router.delete("/delete-our-value-item/:ourValueItemId", deleteOurValuesItem);
export default router;
