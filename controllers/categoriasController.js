const Categorias = require('../models/Categoria');

exports.formNuevaCategoria = (req, res) => {
    res.render('formNuevaCategoria');
}

exports.nuevaCategoria = async (req, res) => {
    const categoria = req.body;
    categoria.clase = req.body.titulo.split(' ').join('');
    
    const categoriaGuardar = new Categorias(categoria);
    await categoriaGuardar.save();
    console.log('Categoria Guardada');
    res.redirect('/nueva-categoria');
}