const Servicios = require("../models/Servicios");
const multer = require("multer");

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/services");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

exports.upload = multer({
  dest: "public/img/services",
  storage,
});

exports.listadoServicios = async (req, res, next) => {
  const servicios = await Servicios.find().lean();
  console.log(servicios);
  res.render("servicios", servicios);
};

exports.formNuevoServicio = (req, res) => {
  res.render("formNuevoServicio");
};

exports.guardarServicio = async (req, res) => {
  const servicio = req.body;
  servicio.urlImagen = req.file.filename;
  const servicioGuardar = new Servicios(servicio);

  await servicioGuardar.save();
  console.log("Servicio Guardado");
  res.redirect("/servicios");
};
