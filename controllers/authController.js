require('../config/passport');
const passport = require('passport');


exports.formLogin = (req, res) => {
    res.render('login');
}

exports.autenticarUsuario = passport.authenticate('local', { 
    successRedirect: '/back',
    failureRedirect: '/login',
    failureFlash: false 
});

exports.verificarUsuario = (req, res, next) => {

    // revisar el usuario
    if(req.isAuthenticated()){
        return next(); // estan autenticados
    }

    // redireccionar
    res.redirect('/login');

}

exports.cerrarSesion = (req, res) => {
    req.logout();
    res.redirect('/login');
}