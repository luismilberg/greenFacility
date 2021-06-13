const Servicios = require("../models/Servicios");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

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
  const servicioBd = await Servicios.findById(servicio._id);

  servicioBd.titulo = servicio.titulo;
  servicioBd.descripcion = servicio.descripcion;

  if(req.file){
    const pathBorrar = __dirname + `/../public/img/services/${servicioBd.urlImagen}`;
    fs.unlink(pathBorrar, (err) => {if(err)console.log(err)});
    servicioBd.urlImagen = req.file.filename;
  }

  await servicioBd.save();

  res.redirect('/servicios');
}


// Eliminar Servicio
exports.borrarServicio = async (req, res) => {
  const id = req.params.id;

  const {urlImagen} = await Servicios.findById(id);
  const pathBorrar = __dirname + `/../public/img/services/${urlImagen}`;
  fs.unlink(pathBorrar, err => {if(err)console.log(err)});

  await Servicios.findByIdAndDelete(id);
  res.redirect('/servicios');
}