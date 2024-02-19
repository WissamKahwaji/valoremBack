import express from "express";

import auth from "../middlewares/auth.js";
import {
  addReviewData,
  deleteReview,
  getCustomerReviews,
} from "../controllers/review_ctrl.js";

const router = express.Router();

router.get("/", getCustomerReviews);
router.post("/", addReviewData);
router.delete("/:reviewId", deleteReview);

export default router;
