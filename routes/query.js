const express = require("express");
const { verifyAuth } = require('../middleware/auth')

const router = express.Router();

router.route('/').post(verifyAuth)

exports.queryRoutes = router;