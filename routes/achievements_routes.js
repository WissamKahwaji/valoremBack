import express from "express";

import auth from "../middlewares/auth.js";
import {
  addAchievementsData,
  deleteAchievementsData,
  editAchievementsData,
  getAchievementsData,
} from "../controllers/achievements_ctrl.js";

const router = express.Router();

router.get("/", getAchievementsData);
router.post("/", addAchievementsData);
router.put("/:achievementsId", editAchievementsData);
router.delete("/:achievementsId", deleteAchievementsData);

export default router;
