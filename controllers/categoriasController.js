const Categorias = require('../models/Categoria');
const shortid = require('shortid');


exports.formNuevaCategoria = (req, res) => {
    res.render('formNuevaCategoria');
}

exports.nuevaCategoria = async (req, res) => {
    const categoria = req.body;
    categoria.clase = shortid.generate();
    
    const categoriaGuardar = new Categorias(categoria);
    await categoriaGuardar.save();

    console.log('Categoria Guardada');
    
    res.redirect('/categorias');
}

exports.listadoCategorias = async(req, res) => {
    const categorias = await Categorias.find().lean();
    res.render('categorias', {categorias});
}

exports.editarCategoria = async (req, res) => {
    const id = req.params.id;

    const categoria = await Categorias.findById(id).lean();

    res.render('formEditarCategoria', categoria);
}

exports.guardarCategoriaEditada = async (req, res) => {
    const categoria = req.body;
    const resultado = await Categorias.findByIdAndUpdate(categoria._id, categoria);

    res.redirect('/categorias');
}

exports.eliminarCategoria = async (req, res) => {
    const id = req.params.id;
    await Categorias.findByIdAndDelete(id);
    res.redirect('/categorias');
}