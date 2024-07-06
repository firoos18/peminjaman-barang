const Joi = require("@hapi/joi");

const registerSchema = Joi.object({
  nama: Joi.string().required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).required(),
  repeatPassword: Joi.ref("password"),
  alamat: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).required(),
});

const tambahBarangSchema = Joi.object({
  idAdmin: Joi.string().required(),
  kodeBarang: Joi.string().required(),
  nama: Joi.string().required(),
  merek: Joi.string().required(),
  jenis: Joi.string().required(),
  unit: Joi.number().required(),
});

const pinjamBarangSchema = Joi.object({
  nama: Joi.string().required(),
  email: Joi.string().required(),
  kodeBarang: Joi.string().required(),
  namaBarang: Joi.string().required(),
  jumlah: Joi.number().required(),
  tanggalPinjam: Joi.string().required(),
  tanggalKembali: Joi.string().required(),
});

module.exports = {
  loginSchema,
  registerSchema,
  tambahBarangSchema,
  pinjamBarangSchema,
};
