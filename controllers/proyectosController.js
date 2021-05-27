const Proyectos = require('../models/Proyectos');

exports.listadoProyectos = (req, res) => {
    res.render('proyectos');
}