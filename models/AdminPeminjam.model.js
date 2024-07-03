const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminPeminjamSchema = new Schema({
  id_admin: {
    type: Schema.Types.ObjectId,
    ref: "admin",
    required: true,
  },
  id_peminjam: {
    type: Schema.Types.ObjectId,
    ref: "peminjam",
    required: true,
  },
});

AdminPeminjamSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;

    return {
      id: ret.id,
      id_admin: ret.id_admin,
      id_peminjam: ret.id_peminjam,
    };
  },
});
