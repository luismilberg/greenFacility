const { Schema, model } = require('mongoose');

const testimoniosSchema = new Schema({
    testimonio: String,
    responsable: String,
});

module.exports = model('Testimonios', testimoniosSchema);