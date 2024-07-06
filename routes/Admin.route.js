const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/Admin.controller");
const { verifyAccessToken } = require("../helpers/jwt_helper");

router.get("/:id", verifyAccessToken, AdminController.getAdminInfo);

module.exports = router;
