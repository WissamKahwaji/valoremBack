import express from "express";

import auth from "../middlewares/auth.js";
import {
  addStatisticsData,
  deleteStatisticsData,
  editStatisticsData,
  getStatisticsData,
} from "../controllers/statistics_ctrl.js";

const router = express.Router();

router.get("/", getStatisticsData);
router.post("/", addStatisticsData);
router.put("/:statisticsId", editStatisticsData);
router.delete("/:statisticsId", deleteStatisticsData);

export default router;
