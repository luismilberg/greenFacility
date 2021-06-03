const multer = require('multer');
const Proyectos = require('../models/Proyectos');
const Categoria = require('../models/Categoria');

const path = require('path');

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname,'../public/img/portfolio'));
     },
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
});

exports.upload = multer({
    dest: path.join(__dirname,'../public/img/portfolio'),
    storage
});

exports.listadoProyectos = async (req, res) => {
    const proyectos = await Proyectos.find().lean();

    console.log(proyectos);
    
    res.render('proyectos',{
        proyectos
    });
}

exports.formNuevoProyecto = async (req,res) => {
    const categorias = await Categoria.find().lean();
    res.render('formNuevoProyecto',{
        categorias
    });
}

exports.guardarProyecto = async (req,res) => {
    const proyecto = req.body;
    proyecto.urlImagen = req.file.filename;
    const proyectoGuardar = new Proyectos(proyecto);
    await proyectoGuardar.save();

    res.redirect('/proyectos')
}

exports.borrarProyecto = async (req,res) => {
    const id = req.params.id;
    console.log(id);
    await Proyectos.findByIdAndDelete(id);
    res.redirect('/proyectos');
}

exports.editarProyecto = async (req, res) => {
    const id = req.params.id;
    const proyecto = await Proyectos.findById(id).lean();
    res.render('formEditarProyecto',proyecto);
}

exports.guardarProyectoEditado = async (req, res) => {
    const proyecto = req.body;
    await Proyectos.findByIdAndUpdate(proyecto._id, proyecto);
    res.redirect('/proyectos');

}