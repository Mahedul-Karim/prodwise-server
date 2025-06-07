const express = require("express");
const { verifyAuth } = require("../middleware/auth");
const {
  createQuery,
  getRecentQuery,
  getAllQueries,
  userQuery,
  queryDetails,
} = require("../controller/query");

const router = express.Router();

router.route("/").post(verifyAuth, createQuery).get(getAllQueries);
router.route("/recent").get(getRecentQuery);
router.route("/my-query").get(verifyAuth, userQuery);
router.route('/:queryId').get(queryDetails)

exports.queryRoutes = router;
