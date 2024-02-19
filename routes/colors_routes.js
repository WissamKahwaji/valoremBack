import express from "express";
import {
  addColors,
  editColors,
  getColors,
} from "../controllers/colors_ctrl.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getColors);
router.post("/add-colors", auth, addColors);
router.put("/edit-colors", auth, editColors);

export default router;
