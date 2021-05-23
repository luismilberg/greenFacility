const {Schema, model}= require('mongoose');

const categoriasSchema = new Schema({
    titulo: String,
    clase: String
});

module.exports = model('Categorias', categoriasSchema);