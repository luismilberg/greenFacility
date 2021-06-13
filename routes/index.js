const express = require('express');
const router = express.Router();

// Controladores
const homeController = require('../controllers/homeController');
const datosEmpresa = require('../controllers/datosEmpresa');
const datosWeb = require('../controllers/datosWeb');
const serviciosController = require('../controllers/serviciosController');
const categoriasController = require('../controllers/categoriasController');
const proyectosController = require('../controllers/proyectosController');
const testimoniosController = require('../controllers/testimoniosController');
const mailerController = require('../controllers/mailerController');
const usuariosController = require('../controllers/usuariosControllers');
const authController = require('../controllers/authController');


module.exports = () => {
    router.get('/', homeController.home);

    // Datos empresa
    router.get('/datos-empresa', 
        authController.verificarUsuario, 
        datosEmpresa.formDatos);

    router.post('/datos-empresa', 
        authController.verificarUsuario, 
        datosEmpresa.guardarDatos);


    // Datos web
    router.get('/datos-web', 
        authController.verificarUsuario, 
        datosWeb.formDatos);

    router.post('/datos-web', 
        authController.verificarUsuario, 
        datosWeb.guardarDatos);


    
    // Categorias
    router.get('/nueva-categoria', 
        authController.verificarUsuario, 
        categoriasController.formNuevaCategoria);

    router.post('/nueva-categoria', 
        authController.verificarUsuario, 
        categoriasController.nuevaCategoria);

    router.get('/categorias', 
        authController.verificarUsuario, 
        categoriasController.listadoCategorias)

    router.get('/categorias/borrar/:id', 
        authController.verificarUsuario, 
        categoriasController.eliminarCategoria);

    router.get('/categorias/editar/:id', 
        authController.verificarUsuario, 
        categoriasController.editarCategoria);

    router.post('/categorias/editar/:id', 
        authController.verificarUsuario, 
        categoriasController.guardarCategoriaEditada);

    
    // Proyectos
    router.get('/proyectos', 
        authController.verificarUsuario, 
        proyectosController.listadoProyectos);

    router.get('/nuevo-proyecto', 
        authController.verificarUsuario, 
        proyectosController.formNuevoProyecto);

    router.post('/nuevo-proyecto', 
        authController.verificarUsuario, 
        proyectosController.upload.single('urlImagen'),
        proyectosController.guardarProyecto);

    router.get('/proyectos/borrar/:id', 
        authController.verificarUsuario, 
        proyectosController.borrarProyecto);

    router.get('/proyectos/editar/:id', 
        authController.verificarUsuario, 
        proyectosController.editarProyecto);

    router.post('/proyectos/editar/:id', 
        authController.verificarUsuario, 
        proyectosController.upload.single('urlImagen'),
        proyectosController.guardarProyectoEditado);

    
    // Servicios
    router.get('/servicios', 
        authController.verificarUsuario, 
        serviciosController.listadoServicios);
        
    router.get('/nuevo-servicio', 
        authController.verificarUsuario, 
        serviciosController.formNuevoServicio);
        
    router.post('/nuevo-servicio', 
        authController.verificarUsuario,
        serviciosController.upload.single('urlImagen'),
        serviciosController.guardarServicio);
        
    router.get('/servicios/borrar/:id', 
        authController.verificarUsuario, 
        serviciosController.borrarServicio);
        
    router.get('/servicios/editar/:id', 
        // authController.verificarUsuario, 
        serviciosController.editarServicio);
        
    router.post('/servicios/editar/:id', 
        // authController.verificarUsuario, 
        serviciosController.upload.single('urlImagen'),
        serviciosController.guardarServicioEditado);


    // Testimonios
    router.get('/testimonios', 
        authController.verificarUsuario, 
        testimoniosController.listadoTestimonios);

    router.get('/testimonios/nuevo', 
        authController.verificarUsuario, 
        testimoniosController.formNuevoTestimonio);

    router.post('/testimonios/nuevo', 
        authController.verificarUsuario, 
        testimoniosController.guardarNuevoTestimonio);

    router.get('/testimonios/borrar/:id', 
        authController.verificarUsuario, 
        testimoniosController.borrarTestimonio);

    router.get('/testimonios/editar/:id', 
        authController.verificarUsuario, 
        testimoniosController.editarTestimonio);

    router.post('/testimonios/editar/:id', 
        authController.verificarUsuario, 
        testimoniosController.guardarTestimonioEditado);

    // Menú
    router.get('/back',
        authController.verificarUsuario,
        (req, res) => {
            res.render('backHome')
        }
    );

    // Mailer
    router.post('/sendMail', mailerController.sendMail);
    
    // Usuarios
    router.get('/usuarios', 
        authController.verificarUsuario, 
        usuariosController.listadoUsuarios);

    router.get('/usuarios/nuevo', 
        authController.verificarUsuario, 
        usuariosController.formNuevoUsuario);

    router.post('/usuarios/nuevo', 
        authController.verificarUsuario, 
        usuariosController.guardarNuevoUsuario);

    router.get('/usuarios/borrar/:id', 
        authController.verificarUsuario, 
        usuariosController.borrarUsuario);

    router.get('/usuarios/editar/:id', 
        authController.verificarUsuario, 
        usuariosController.editarUsuario);

    router.post('/usuarios/editar/:id', 
        authController.verificarUsuario, 
        usuariosController.guardarUsuarioEditado);


    // Sesiones
    router.get('/login', authController.formLogin);
    router.post('/login', authController.autenticarUsuario);
    router.get('/cerrarSesion', authController.cerrarSesion);

    return router;
}