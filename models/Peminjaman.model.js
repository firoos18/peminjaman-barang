const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PeminjamanSchema = new Schema({
  idPeminjam: {
    type: Schema.Types.ObjectId,
    ref: "peminjam",
    required: true,
  },
  idBarang: {
    type: Schema.Types.ObjectId,
    ref: "barang",
    required: true,
  },
  jumlah: {
    type: Number,
    required: true,
  },
  tanggalPinjam: {
    type: Date,
    required: true,
  },
  tanggalKembali: {
    type: Date,
    required: true,
  },
});

PeminjamanSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;

    return {
      id: ret.id,
      peminjam: ret.idPeminjam,
      barang: ret.idBarang,
      jumlah: ret.jumlah,
      tanggalPinjam: ret.tanggalPinjam,
      tanggalKembali: ret.tanggalKembali,
    };
  },
});

const Peminjaman = mongoose.model("peminjaman", PeminjamanSchema);
module.exports = Peminjaman;
