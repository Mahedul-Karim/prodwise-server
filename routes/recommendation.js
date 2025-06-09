const express = require("express");
const { verifyAuth } = require("../middleware/auth");
const {
  createRecommendation,
  recommendationsForUser,
} = require("../controller/recommendation");

const router = express.Router();

router
  .route("/")
  .post(verifyAuth, createRecommendation)
  .get(verifyAuth, recommendationsForUser);

exports.recommendationRoutes = router;
