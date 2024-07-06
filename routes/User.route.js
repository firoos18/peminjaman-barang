const express = require("express");
const router = express.Router();
const UserController = require("../controllers/User.controller");
const { verifyAccessToken } = require("../helpers/jwt_helper");

router.get("/:id", verifyAccessToken, UserController.getPeminjamInfo);

module.exports = router;
