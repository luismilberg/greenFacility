const { Schema, model } = require('mongoose');

const serviciosSchema = new Schema({
    urlImagen: String,
    titulo: String,
    descripcion: String
});

module.exports = model('Servicios', serviciosSchema);