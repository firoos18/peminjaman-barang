const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/Auth.controller");

router.post("/admin/register", AuthController.adminRegister);

router.post("/admin/login", AuthController.adminLogin);

router.post("/user/register", AuthController.userRegister);

router.post("/user/login", AuthController.userLogin);

module.exports = router;
