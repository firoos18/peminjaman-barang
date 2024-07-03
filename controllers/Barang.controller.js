const createError = require("http-errors");
const Barang = require("../models/Barang.model");
const AdminBarang = require("../models/AdminBarang.model");
const { tambahBarangSchema } = require("../helpers/validation_schema");

async function addBarang(req, res, next) {
  try {
    const { idAdmin } = req.body;

    const result = await tambahBarangSchema.validateAsync(req.body);

    const doesExist = await Barang.findOne({ kode_barang: result.kode_barang });
    if (doesExist)
      throw createError.Conflict(
        `Barang with kode barang ${result.kode_barang} is already been registered.`
      );

    const barang = await Barang(result);
    await barang.save();

    const barangAdminModel = {
      id_admin: idAdmin,
      id_barang: barang.id,
    };

    const barangAdmin = await AdminBarang(barangAdminModel);
    await barangAdmin.save();

    const response = {
      status: 201,
      message: "added",
      data: barang,
    };

    res.send(response);
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
}

async function getAllBarang(req, res, next) {
  try {
    const barang = await Barang.find();

    const response = {
      status: 200,
      message: "success",
      data: barang,
    };

    res.send(response);
  } catch (error) {
    next(error);
  }
}

async function getBarangByKodeBarang(req, res, next) {
  try {
    const { id } = req.params;

    const barang = await Barang.findOne({ kode_barang: id });

    const response = {
      status: 200,
      message: "success",
      data: barang,
    };

    res.send(response);
  } catch (error) {
    next(error);
  }
}

async function updateBarang(req, res, next) {
  try {
    const { id } = req.params;

    const barang = await Barang.findOne({ kode_barang: id });
    if (!barang)
      throw createError.NotFound(`Barang with kode barang ${id} is not found`);

    const updateData = req.body;

    const updatedBarang = await Barang.findOneAndUpdate(
      { kode_barang: id },
      { $set: updateData },
      { returnOriginal: false }
    );

    const response = {
      status: 200,
      message: "success",
      data: updatedBarang,
    };

    res.send(response);
  } catch (error) {
    next(error);
  }
}

async function deleteBarang(req, res, next) {
  try {
    const { id } = req.params;

    const barang = await Barang.findOne({ kode_barang: id });
    if (!barang)
      throw createError.NotFound(`Barang with kode barang ${id} is not found`);

    await AdminBarang.deleteOne({ id_barang: barang.id });
    await Barang.deleteOne({ kode_barang: id });

    const response = {
      status: 200,
      message: "deleted",
    };

    res.send(response);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  addBarang,
  getAllBarang,
  getBarangByKodeBarang,
  updateBarang,
  deleteBarang,
};