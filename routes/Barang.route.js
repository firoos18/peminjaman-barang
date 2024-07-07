const express = require("express");
const router = express.Router();
const BarangController = require("../controllers/Barang.controller");
const { verifyAccessToken } = require("../helpers/jwt_helper");

router.get("/", verifyAccessToken, BarangController.getAllBarang);

router.get("/:id", verifyAccessToken, BarangController.getBarangById);

router.get("/admin/:id", verifyAccessToken, BarangController.getBarangByUid);

router.post("/add/", verifyAccessToken, BarangController.addBarang);

router.patch("/edit/:id", verifyAccessToken, BarangController.updateBarang);

router.delete("/delete/:id", verifyAccessToken, BarangController.deleteBarang);

module.exports = router;
