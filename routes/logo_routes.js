import express from "express";
import { addLogoData, getLogoData } from "../controllers/logo_ctrl.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getLogoData);
router.post("/", auth, addLogoData);

export default router;
