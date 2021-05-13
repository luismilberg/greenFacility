const { Schema, model } = require('mongoose');

const datosEmpresaSchema = new Schema({ 
    direccionCalle: String,
    direccionCiudadProvincia: String,
    horarioSemana: String,
    horarioEspecial: String,
    infoContactoTelefono: String,
    infoContactoEmail: String,
    redesFacebook: String,
    redesInstagram: String
});

module.exports = model('DatosEmpresa', datosEmpresaSchema);