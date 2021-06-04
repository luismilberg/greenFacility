// const passport = require('passport');
// const mongoose = require('mongoose');
// const Usuario = require('../models/Usuarios');

// // const crypto = require('crypto');
// // const enviarEmail = require('../handlers/email');

// exports.autenticarUsuario = passport.authenticate('local', {
//     successRedirect: '/back',
//     failureFlash: '/login',
//     failureFlash: true,
//     badRequestMessage: 'Ambos campos son obligatorios'
// });

// // Verificar si el usuario está autenticado
// exports.verificarUsuario = (req, res, next) => {
//     if(req.isAuthenticated()){
//         return next();
//     }

//     res.redirect('/login');
// }

// // Mostrar home al estar autenticado
// exports.mostrarBack = (req, res) => {
//     res.render('backHome');
// }

// // Cerrar sesión
// exports.cerrarSesion = (req, res) => {
//     req.logout();
//     return res.redirect('/login');
// }