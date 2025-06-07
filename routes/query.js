const express = require("express");
const { verifyAuth } = require("../middleware/auth");
const { createQuery } = require("../controller/query");

const router = express.Router();

router.route("/").post(verifyAuth, createQuery);

exports.queryRoutes = router;
