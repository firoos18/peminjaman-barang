const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const PeminjamSchema = new Schema({
  nama: {
    type: String,
    required: true,
  },
  alamat: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowecase: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

PeminjamSchema.pre("save", async function (next) {
  try {
    if (this.isNew) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
    }
    next();
  } catch (error) {
    next(error);
  }
});

PeminjamSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

PeminjamSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;

    return {
      id: ret.id,
      nama: ret.nama,
      alamat: ret.alamat,
      email: ret.email,
    };
  },
});

const Peminjam = mongoose.model("peminjam", PeminjamSchema);
module.exports = Peminjam;
