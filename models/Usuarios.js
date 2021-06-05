const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');


const usuariosSchema = new Schema({
    email: String,
    nombre: String,
    password: String
});


// Hashear la contraseña antes de guardar
usuariosSchema.pre('save', async function (next){

    // Si el password ya está hasheado
    if(!this.isModified('password')){
        return next(); // Detener la ejecución y continuar
    }

    // Si no está hasheado
    const hash = await bcrypt.hash(this.password, 12);
    this.password = hash;
    next();
});


// Autenticar usuarios para el login
usuariosSchema.methods = {
    compararPassword: function(password ){
        return bcrypt.compareSync(password. this.password);
    }
}

// Verificar si el usuario ya está creado
usuariosSchema.post('save', async function(error, doc, next){
    if(error.name === 'MongoError' && error.code === 11000){
        next('Ese correo ya está registrado');
    } else {
        next(error);
    }

});

module.exports = model('Usuarios', usuariosSchema);