const { Schema, model } = require('mongoose');

const proyectosSchema = new Schema({
    titulo: String,
    urlImagen: String,
    categoriaClase: String
});

module.exports = model('Proyectos', proyectosSchema);