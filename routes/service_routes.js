import express from "express";

import auth from "../middlewares/auth.js";
import {
  addContentToService,
  addServiceData,
  deleteContentInService,
  deleteServiceData,
  editContentInService,
  editServiceData,
  getServiceData,
} from "../controllers/service_ctrl.js";

const router = express.Router();

router.get("/", getServiceData);
router.post("/add", addServiceData);
router.put("/edit/:serviceId", editServiceData);
router.delete("/delete/:serviceId", deleteServiceData);

router.post("/add-content/:serviceId", addContentToService);
router.put("/:serviceId/edit-content/:contentId", editContentInService);
router.delete("/:serviceId/delete-content/:contentId", deleteContentInService);

export default router;
