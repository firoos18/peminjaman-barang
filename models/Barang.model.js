const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BarangSchema = new Schema({
  kodeBarang: {
    type: String,
    required: true,
  },
  nama: {
    type: String,
    required: true,
  },
  merek: {
    type: String,
    required: true,
  },
  jenis: {
    type: String,
    required: true,
  },
  unit: {
    type: Number,
    required: true,
  },
});

BarangSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;

    return {
      id: ret.id,
      kodeBarang: ret.kode_barang,
      nama: ret.nama,
      merek: ret.merek,
      jenis: ret.jenis,
      unit: ret.unit,
    };
  },
});

const Barang = mongoose.model("barang", BarangSchema);
module.exports = Barang;
