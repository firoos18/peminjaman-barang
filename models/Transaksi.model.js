const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransaksiSchema = new Schema({
  tanggalPinjam: {
    type: Date,
    required: true,
  },
  idPeminjaman: {
    type: Schema.Types.ObjectId,
    ref: "peminjaman",
    required: true,
  },
  idBarang: {
    type: Schema.Types.ObjectId,
    ref: "barang",
    required: true,
  },
  unit: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

TransaksiSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;

    return {
      id: ret.id,
      tanggalPinjam: ret.tanggalPinjam,
      idPeminjaman: ret.idPeminjaman,
      idBarang: ret.idBarang,
      unit: ret.unit,
      status: ret.status,
    };
  },
});

const Transaksi = mongoose.model("transaksi", TransaksiSchema);
module.exports = Transaksi;
