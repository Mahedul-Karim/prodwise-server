const express = require("express");
const { verifyAuth } = require("../middleware/auth");
const {
  createRecommendation,
  recommendationsForUser,
  recommendationsForMe,
  deleteRecommendation,
} = require("../controller/recommendation");

const router = express.Router();

router
  .route("/")
  .post(verifyAuth, createRecommendation)
  .get(verifyAuth, recommendationsForUser);

router.route("/me").get(verifyAuth, recommendationsForMe);
router.route("/:recomId").delete(verifyAuth, deleteRecommendation);

exports.recommendationRoutes = router;
