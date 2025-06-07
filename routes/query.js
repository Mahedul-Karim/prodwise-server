const express = require("express");
const { verifyAuth } = require("../middleware/auth");
const { createQuery, getRecentQuery } = require("../controller/query");

const router = express.Router();

router.route("/").post(verifyAuth, createQuery);
router.route("/recent").get(getRecentQuery);

exports.queryRoutes = router;
