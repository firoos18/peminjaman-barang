const createError = require("http-errors");
const Admin = require("../models/Admin.model");
const Peminjam = require("../models/Peminjam.model");
const { registerSchema, loginSchema } = require("../helpers/validation_schema");
const { signAccessToken } = require("../helpers/jwt_helper");

async function adminRegister(req, res, next) {
  try {
    const result = await registerSchema.validateAsync(req.body);

    const doesExist = await Admin.findOne({ email: result.email });
    if (doesExist)
      throw createError.Conflict(`${result.email} is already been registered.`);

    const admin = new Admin(result);
    await admin.save();

    const response = {
      status: 201,
      message: "registered",
    };

    res.send(response);
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
}

async function userRegister(req, res, next) {
  try {
    const result = await registerSchema.validateAsync(req.body);

    const doesExist = await Peminjam.findOne({ email: result.email });
    if (doesExist)
      throw createError.Conflict(`${result.email} is already been registered.`);

    const peminjam = new Peminjam(result);
    await peminjam.save();

    const response = {
      status: 201,
      message: "registered",
    };

    res.send(response);
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
}

async function adminLogin(req, res, next) {
  try {
    const result = await loginSchema.validateAsync(req.body);
    const admin = await Admin.findOne({ email: result.email });
    if (!admin) throw createError.NotFound("User not registered");

    const isMatch = await admin.isValidPassword(result.password);
    if (!isMatch)
      throw createError.Unauthorized("Either Email / Password is Incorrect");

    const accessToken = await signAccessToken(admin.id);

    const response = {
      status: 200,
      message: "success",
      data: {
        email: admin.email,
        uid: admin.id,
        token: accessToken,
      },
    };

    res.send(response);
  } catch (error) {
    if (error.isJoi === true)
      return next(createError.BadRequest("Invalid Email / Password"));

    next(error);
  }
}

async function userLogin(req, res, next) {
  try {
    const result = await loginSchema.validateAsync(req.body);
    const peminjam = await Peminjam.findOne({ email: result.email });
    if (!peminjam) throw createError.NotFound("User not registered");

    const isMatch = await peminjam.isValidPassword(result.password);
    if (!isMatch)
      throw createError.Unauthorized("Either Email / Password is Incorrect");

    const accessToken = await signAccessToken(peminjam.id);

    const response = {
      status: 200,
      message: "success",
      data: {
        email: peminjam.email,
        uid: peminjam.id,
        token: accessToken,
      },
    };

    res.send(response);
  } catch (error) {
    if (error.isJoi === true)
      return next(createError.BadRequest("Invalid Email / Password"));

    next(error);
  }
}

module.exports = {
  adminRegister,
  adminLogin,
  userRegister,
  userLogin,
};
