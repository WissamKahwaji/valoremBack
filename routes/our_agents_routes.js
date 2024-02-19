import express from "express";

import auth from "../middlewares/auth.js";
import {
  addOurAgentsData,
  deleteOurAgentsData,
  editOurAgentsData,
  getOurAgentsData,
} from "../controllers/our_agents_ctrl.js";

const router = express.Router();

router.get("/", getOurAgentsData);
router.post("/", addOurAgentsData);
router.put("/:agentId", editOurAgentsData);
router.delete("/:agentId", deleteOurAgentsData);

export default router;
