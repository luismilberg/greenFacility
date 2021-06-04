const Usuarios = require('../models/Usuarios');

exports.listadoUsuarios = async (req, res) => {
    const usuarios = await Usuarios.find().lean();
    res.render('usuarios', { usuarios });
}

exports.formNuevoUsuario = (req, res) => {
    res.render('formNuevoUsuario');
}

exports.guardarNuevoUsuario = async (req, res) => {
    const usuario = new Usuarios(req.body);
    await usuario.save();
    res.redirect('/usuarios');
}

exports.borrarUsuario = async(req, res) => {
    const id = req.params.id;
    await Usuarios.findByIdAndDelete(id);
    res.redirect('/usuarios');
}

exports.editarUsuario = async(req, res) => {
    const usuario = await Usuarios.findById(req.params.id);
    // console.log(usuario); // descomentar para verificar el usuario que pasa a edición
    res.render('formEditarUsuarios', usuario);
}

exports.guardarUsuarioEditado = async(req, res) => {
    const {_id, nombre, email, password} = req.body;

    const usuarioBd = await Usuarios.findById(_id);

    usuarioBd.set({
        _id,
        nombre,
        email
    });

    if(password !== ''){
        usuarioBd.set({
            password
        });
    }

    await usuarioBd.save();

    res.redirect('/usuarios');

}

exports.formIniciarSesion = (req, res) => {
    res.render('formIniciarSesion');
}