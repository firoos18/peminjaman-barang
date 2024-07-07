const express = require("express");
const router = express.Router();
const PeminjamanController = require("../controllers/Peminjaman.controller");
const { verifyAccessToken } = require("../helpers/jwt_helper");

router.get("/", verifyAccessToken, PeminjamanController.getAllPeminjaman);

router.post("/", verifyAccessToken, PeminjamanController.pinjamBarang);

router.get("/:id", verifyAccessToken, PeminjamanController.getPeminjamanData);

module.exports = router;
