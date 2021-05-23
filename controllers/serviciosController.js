const Servicios = require('../models/Servicios');

exports.formNuevoServicio = (req, res) => {
    res.render('formNuevoServicio');
}

exports.guardarServicio = async(req, res) =>{
    const servicio = new Servicios(req.body);
    await servicio.save();
    console.log('Servicio Guardado');
    res.redirect('/nuevo-servicio');
}