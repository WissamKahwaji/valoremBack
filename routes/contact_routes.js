import express from "express";
import {
  addContactData,
  deleteContactData,
  editContactData,
  getContactData,
  sendEmail,
} from "../controllers/contact_ctrl.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getContactData);
router.post("/add-contact-data", addContactData);
router.put("/edit-contact-data/:id", editContactData);
router.delete("/delete-contact-data/:id", deleteContactData);

router.post("/send-email", sendEmail);
export default router;
