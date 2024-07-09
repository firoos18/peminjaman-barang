const createError = require("http-errors");
const Peminjaman = require("../models/Peminjaman.model");
const Barang = require("../models/Barang.model");
const Peminjam = require("../models/Peminjam.model");
const Transaksi = require("../models/Transaksi.model");
const { pinjamBarangSchema } = require("../helpers/validation_schema");

async function getAllPeminjaman(req, res, next) {
  try {
    const peminjaman = await Peminjaman.find()
      .populate("idPeminjam")
      .populate("idBarang");

    const response = {
      status: 200,
      message: "success",
      data: peminjaman,
    };

    res.send(response);
  } catch (error) {
    next(error);
  }
}

async function pinjamBarang(req, res, next) {
  try {
    const result = await pinjamBarangSchema.validateAsync(req.body);

    const peminjamFromEmail = await Peminjam.findOne({ email: result.email });
    if (!peminjamFromEmail)
      throw createError.NotFound(
        `User with email ${result.email} is not found`
      );

    const barangFromKode = await Barang.findOne({
      kodeBarang: result.kodeBarang,
    });
    if (!barangFromKode)
      throw createError.NotFound(
        `Barang with kode barang ${result.kodeBarang} is not found`
      );

    const barangFromNama = await Barang.findOne({ nama: result.namaBarang });
    if (!barangFromNama)
      throw createError.NotFound(
        `Barang with nama barang ${result.namaBarang} is not found`
      );

    if (result.jumlah > barangFromKode.unit)
      throw createError.Conflict("Unit barang is not available");

    const dataPeminjaman = {
      idPeminjam: peminjamFromEmail.id,
      idBarang: barangFromKode.id,
      jumlah: result.jumlah,
      tanggalPinjam: result.tanggalPinjam,
      tanggalKembali: result.tanggalKembali,
    };

    const peminjaman = await Peminjaman(dataPeminjaman);
    await peminjaman.save();

    await Barang.findOneAndUpdate(
      { kodeBarang: result.kodeBarang },
      { $set: { unit: barangFromKode.unit - result.jumlah } }
    );

    const dataTransaksi = {
      tanggalPinjam: result.tanggalPinjam,
      idPeminjaman: peminjaman.id,
      idBarang: barangFromKode.id,
      unit: result.jumlah,
      status: "Dipinjam",
    };

    const transaksi = await Transaksi(dataTransaksi);
    await transaksi.save();

    const response = {
      status: 200,
      message: "success",
    };

    res.send(response);
  } catch (error) {
    next(error);
  }
}

async function getPeminjamanData(req, res, next) {
  try {
    const { id } = req.params;

    const peminjam = await Peminjam.findById(id);
    if (!peminjam)
      throw createError.NotFound(`Peminjam with id ${id} is not found`);

    const peminjaman = await Peminjaman.find({ idPeminjam: id })
      .populate("idPeminjam")
      .populate("idBarang");

    const response = {
      status: 200,
      message: "success",
      data: peminjaman,
    };

    res.send(response);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllPeminjaman,
  pinjamBarang,
  getPeminjamanData,
};
