const express = require("express");
const { verifyAuth } = require("../middleware/auth");
const {
  createQuery,
  getRecentQuery,
  getAllQueries,
  userQuery,
  queryDetails,
  updateQuery,
  deleteQuery,
} = require("../controller/query");

const router = express.Router();

router.route("/").post(verifyAuth, createQuery).get(getAllQueries);
router.route("/recent").get(getRecentQuery);
router.route("/my-query").get(verifyAuth, userQuery);
router
  .route("/:queryId")
  .get(queryDetails)
  .patch(verifyAuth, updateQuery)
  .delete(verifyAuth, deleteQuery);

exports.queryRoutes = router;
