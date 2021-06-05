const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Usuarios = require('../models/Usuarios');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy({

        usernameField: 'email',
        passwordField: 'password'

    },
    async (email, password, done) => {
        await Usuarios.findOne({email}, (err, usuario) => {
            if (err) {return done(err)}
            if(!usuario){
                return done(null, false, {message: 'Usuario Inexistente'});
            }
            const verificarPassword = bcrypt.compareSync(password, usuario.password);
            if(!verificarPassword){
                return done(null, false, {message: 'Contraseña Incorrecta'});
            }
            return done(null, usuario);
        });
    }

));

passport.serializeUser((usuario, done) => done(null, usuario._id));

passport.deserializeUser(async (id, done) => {
    const usuario = await Usuarios.findById(id).exec();
    return done(null, usuario);
});

module.exports = passport;