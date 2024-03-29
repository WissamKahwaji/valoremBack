import express from "express";
import auth from "../middlewares/auth.js";
import {
  addOurTeamPage,
  addTeamItem,
  deleteTeamItem,
  editTeamItem,
  editTeamPage,
  getOurTeamData,
  getTeamsData,
  reOrderTeams,
} from "../controllers/our_team_ctrl.js";

const router = express.Router();

router.get("/", getOurTeamData);
router.post("/", addOurTeamPage);
router.put("/", editTeamPage);
router.get("/teams", getTeamsData);
router.post("/add-team-item", addTeamItem);
router.put("/edit-team-item/:teamItemId", editTeamItem);
router.delete("/delete-team-item/:teamItemId", deleteTeamItem);
router.post("/reorder-team", reOrderTeams);
export default router;
