import express from "express";
import auth from "../middlewares/auth.js";
import {
  addInterProperty,
  addPropertyInterContent,
  deleteInterProperty,
  editInterProperty,
  getInterPropertiesById,
  getInterPropertiesData,
} from "../controllers/property_inter_ctrl.js";

const router = express.Router();

router.get("/", getInterPropertiesData);
router.get("/:id", getInterPropertiesById);
router.post("/add", addInterProperty);
router.put("/edit/:propertyId", editInterProperty);
router.delete("/delete/:id", deleteInterProperty);
router.post("/add-content/:propertyId", addPropertyInterContent);
export default router;
