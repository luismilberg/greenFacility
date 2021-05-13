const { Schema, model } = require('mongoose');

const datosWebSchema = new Schema({
    queHacemos: String,
    quienesSomos: String,
    consultaGratis: String,
    nuestrosServicios: String,
    galeriaProyectos: String,
    contactanos: String
});

module.exports = model('DatosWeb', datosWebSchema);