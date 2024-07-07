const express = require("express");
const router = express.Router();
const TransaksiController = require("../controllers/Transaksi.controller");
const { verifyAccessToken } = require("../helpers/jwt_helper");

router.get("/", verifyAccessToken, TransaksiController.getAllTransaksiAdmin);

router.get("/:id", verifyAccessToken, TransaksiController.getAllTransaksiUser);

module.exports = router;
