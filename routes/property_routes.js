import express from "express";

import auth from "../middlewares/auth.js";
import {
  addProperty,
  addPropertyContent,
  addPropertyTypeData,
  deleteProperty,
  deletePropertyContent,
  deletePropertyTypeData,
  editProperty,
  editPropertyContent,
  editPropertyTypeData,
  getFourMinPriceProperties,
  getLastSixProperties,
  getPropertiesByType,
  getPropertiesData,
  getPropertyById,
  getPropertyTypeById,
  getPropertyTypeData,
  getPropertyWithType,
} from "../controllers/property_ctrl.js";

const router = express.Router();

router.get("/property-type", getPropertyTypeData);
router.get("/property-type/:id", getPropertyTypeById);
router.post("/property-type/add", addPropertyTypeData);
router.put("/property-type/edit/:id", editPropertyTypeData);
router.delete("/property-type/delete/:id", deletePropertyTypeData);
router.get("/property-with-type", getPropertyWithType);

router.get("/", getPropertiesData);
router.get("/last-properties", getLastSixProperties);
router.get("/min-price-properties", getFourMinPriceProperties);

router.get("/by-type", getPropertiesByType);
router.get("/:id", getPropertyById);

router.post("/add", addProperty);
router.put("/edit/:propertyId", editProperty);
router.delete("/delete/:id", deleteProperty);

router.post("/add-content/:propertyId", addPropertyContent);
router.put("/:propertyId/edit-content/:contentId", editPropertyContent);
router.delete("/:propertyId/delete-content/:contentId", deletePropertyContent);

export default router;
