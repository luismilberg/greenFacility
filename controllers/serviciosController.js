const Servicios = require("../models/Servicios");
const multer = require("multer");
const path = require("path");

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,"../public/img/services"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

exports.upload = multer({
  dest: path.join(__dirname,"../public/img/services"),
  storage,
});

exports.listadoServicios = async (req, res, next) => {
  const servicios = await Servicios.find().lean();
  console.log(servicios);
  res.render("servicios", {servicios});
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

// Editar Servicio
exports.editarServicio = async (req, res) => {
  const id = req.params.id;
  const servicio = await Servicios.findById(id).lean();
  res.render('formEditarServicio', servicio);
}

exports.guardarServicioEditado = async (req, res) => {
  const servicio = req.body;
  await Servicios.findByIdAndUpdate(servicio._id, servicio);
  res.redirect('/servicios');
}


// Eliminar Servicio
exports.borrarServicio = async (req, res) => {
  const id = req.params.id;
  await Servicios.findByIdAndDelete(id);
  res.redirect('/servicios');
}