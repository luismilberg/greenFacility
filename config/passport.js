const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Usuarios = require('../models/Usuarios');

passport.use(new LocalStrategy(
    function(email, password, done) {
      Usuarios.findOne({ email }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.compararPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));


// passport.use(new LocalStrategy({
//     usernameField: 'email',
//     passwordField: 'password'
//     },
//     async(email, password, done) => {

//         // Se verifica si existe el usuario
//         const usuario = await Usuarios.findOne({email});

//         if(!usuario){
//             return done (null, false, {
//                 message: 'Usuario Inexistente'
//             });
//         }

//         // Si el usuario existe se verifica su password
//         const verificarPassword = usuario.compararPassword(password);

//         if(!verificarPassword){
//             return done(null, false, {
//                 message: 'Password incorrecta'
//             });
//         }

//         // El usuario existe y la password es correcta
//         return done(null, usuario);

//     }

// ));

passport.serializeUser((usuario, done) =>{
    return done(null, usuario._id);
});

passport.deserializeUser(async (id, done) => {
    const usuario = await Usuarios.findById(id).exec;
    return done(ull, usuario);
});

module.exports = passport;