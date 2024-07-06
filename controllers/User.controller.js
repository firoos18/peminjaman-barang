const createError = require("http-errors");
const Peminjam = require("../models/Peminjam.model");

async function getPeminjamInfo(req, res, next) {
  try {
    const { id } = req.params;

    const peminjam = await Peminjam.findById(id);
    if (!peminjam) throw createError.NotFound("User not found");

    const response = {
      status: 200,
      message: "success",
      data: peminjam,
    };

    res.send(response);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getPeminjamInfo,
};
