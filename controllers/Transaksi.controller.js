const createError = require("http-errors");
const Transaksi = require("../models/Transaksi.model");
const Peminjam = require("../models/Peminjam.model");
const Peminjaman = require("../models/Peminjaman.model");

async function getAllTransaksiAdmin(req, res, next) {
  try {
    const transaksi = await Transaksi.find()
      .populate("idBarang")
      .populate({
        path: "idPeminjaman",
        populate: {
          path: "idPeminjam",
          model: "peminjam",
        },
      });

    const response = {
      status: 200,
      message: "success",
      data: transaksi,
    };

    res.send(response);
  } catch (error) {
    next(error);
  }
}

async function getAllTransaksiUser(req, res, next) {
  try {
    const { id } = req.params;

    const user = await Peminjam.findById(id);
    if (!user) throw createError.NotFound("User not found!");

    const peminjaman = await Peminjaman.find({ idPeminjam: user.id });

    let peminjamanId = [];

    for (var index in peminjaman) {
      peminjamanId.push(peminjaman[index].id);
    }

    const transaksi = await Transaksi.find({
      idPeminjaman: { $in: peminjamanId },
    })
      .populate({
        path: "idPeminjaman",
        populate: {
          path: "idPeminjam",
          model: "peminjam",
        },
      })
      .populate("idBarang");

    const response = {
      status: 200,
      message: "success",
      data: transaksi,
    };

    res.send(response);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllTransaksiAdmin,
  getAllTransaksiUser,
};
