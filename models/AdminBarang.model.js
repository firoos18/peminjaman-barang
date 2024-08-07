const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminBarangSchema = new Schema({
  id_admin: {
    type: Schema.Types.ObjectId,
    ref: "admin",
    required: true,
  },
  id_barang: {
    type: Schema.Types.ObjectId,
    ref: "barang",
    required: true,
  },
});

AdminBarangSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;

    return {
      id: ret.id,
      admin: ret.id_admin,
      barang: ret.id_barang,
    };
  },
});

const AdminBarang = mongoose.model("admin-barang", AdminBarangSchema);
module.exports = AdminBarang;
