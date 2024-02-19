import express from "express";
import auth from "../middlewares/auth.js";
import {
  addOurTeamPage,
  addTeamItem,
  deleteTeamItem,
  editTeamItem,
  editTeamPage,
  getOurTeamData,
} from "../controllers/our_team_ctrl.js";

const router = express.Router();

router.get("/", getOurTeamData);
router.post("/", addOurTeamPage);
router.put("/", editTeamPage);

router.post("/add-team-item", addTeamItem);
router.put("/edit-team-item/:teamItemId", editTeamItem);
router.delete("/delete-team-item/:teamItemId", deleteTeamItem);

export default router;
