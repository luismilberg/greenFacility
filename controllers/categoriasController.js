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
    
    res.redirect('/nueva-categoria');
}

exports.listadoCategorias = async(req, res) => {
    res.render('categorias');
}