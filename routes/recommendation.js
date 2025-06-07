const express = require("express");
const { verifyAuth } = require("../middleware/auth");
const { createRecommendation } = require("../controller/recommendation");

const router = express.Router();

router.route("/").post(verifyAuth, createRecommendation);

exports.recommendationRoutes = router;
