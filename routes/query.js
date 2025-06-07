const express = require("express");
const { verifyAuth } = require("../middleware/auth");
const {
  createQuery,
  getRecentQuery,
  getAllQueries,
} = require("../controller/query");

const router = express.Router();

router.route("/").post(verifyAuth, createQuery).get(getAllQueries);
router.route("/recent").get(getRecentQuery);

exports.queryRoutes = router;
