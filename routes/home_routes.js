import express from "express";
import { addHomeData, getHomeData } from "../controllers/home_ctrl.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getHomeData);
router.post("/", auth, addHomeData);

export default router;
