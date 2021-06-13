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


// Listado de proyectos
exports.listadoProyectos = async (req, res) => {
    const proyectos = await Proyectos.find();
    const categorias = await Categoria.find();

    console.log(proyectos);
    console.log(categorias);

    proyectosListado = proyectos.map( proy => {
        const categoria = categorias.find( cat => {
            return cat.clase === proy.categoriaClase;
        });
        const proyecto = {
            _id: proy._id,
            titulo: proy.titulo,       
            categoriaClase: categoria.titulo
        }
        return proyecto;
    });
    
    res.render('proyectos',{
        proyectosListado
    });
}


// Creación de proyectos
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


// Borrado de proyectos
exports.borrarProyecto = async (req,res) => {
    const id = req.params.id;
    // console.log(id);
    await Proyectos.findByIdAndDelete(id);
    res.redirect('/proyectos');
}


// Edición de proyectos
exports.editarProyecto = async (req, res) => {
    const id = req.params.id;
    const proyecto = await Proyectos.findById(id).lean();
    const categorias = await Categoria.find();

    const categoriasSelected = categorias.map( cat => {
        selected = cat.clase === proyecto.categoriaClase?'selected':'';

        const categoria = {
            _id: cat._id,
            titulo: cat.titulo,
            clase: cat.clase,
            selected
        }

        return categoria;
    });

    console.log(categoriasSelected);

    res.render('formEditarProyecto',{
        proyecto,
        categoriasSelected
    });
}

exports.guardarProyectoEditado = async (req, res) => {
    const proyecto = req.body;
    await Proyectos.findByIdAndUpdate(proyecto._id, proyecto);
    res.redirect('/proyectos');

}