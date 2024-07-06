const createError = require("http-errors");
const Admin = require("../models/Admin.model");

async function getAdminInfo(req, res, next) {
  try {
    const { id } = req.params;

    const admin = await Admin.findById(id);
    if (!admin) throw createError.NotFound("User not found");

    response = {
      status: 200,
      message: "success",
      data: admin,
    };

    res.send(response);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAdminInfo,
};
