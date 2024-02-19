import { ReviewModel } from "../models/reviews/review_model.js";

export const getCustomerReviews = async (req, res, next) => {
  try {
    const reviews = await ReviewModel.find();
    return res.status(200).json(reviews);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const addReviewData = async (req, res, next) => {
  try {
    const { customerName, review } = req.body;

    const imgPath =
      req.files && req.files["img"] ? req.files["img"][0].path : null;
    const imgUrlImg = imgPath
      ? `${process.env.BASE_URL}` + imgPath.replace(/\\/g, "/")
      : null;
    const newReview = new ReviewModel({
      customerName,
      customerImg: imgUrlImg,
      review,
    });
    const savedReview = await newReview.save();
    return res.status(201).json(savedReview);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const deleteReview = async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    const deletedReview = await ReviewModel.findByIdAndDelete(reviewId);
    if (!deletedReview) {
      const error = new Error("Review not found");
      error.status = 404;
      throw error;
    }
    return res
      .status(200)
      .json({ message: "Reviews data deleted successfully" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
