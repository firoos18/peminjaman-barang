const express = require("express");
const createError = require("http-errors");
const http = require("http");
require("dotenv").config();
require("./helpers/init_mongodb");
const AuthRoute = require("./routes/Auth.route");
const BarangRoute = require("./routes/Barang.route");
const PeminjamanRoute = require("./routes/Peminjaman.route");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", async (req, res, next) => {
  res.send("Hello, from backend");
});

app.use("/auth", AuthRoute);
app.use("/barang", BarangRoute);
app.use("/peminjaman", PeminjamanRoute);

app.use(async (req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const server = http.createServer(app);

server.setTimeout(6000, (socket) => {
  console.log("Request has timed out");
  socket.end("Request has timed out");
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
