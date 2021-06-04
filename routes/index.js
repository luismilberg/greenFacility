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


module.exports = () => {
    router.get('/', homeController.home);
    
    // Datos empresa
    router.get('/datos-empresa', datosEmpresa.formDatos);
    router.post('/datos-empresa', datosEmpresa.guardarDatos);

    // Datos web
    router.get('/datos-web', datosWeb.formDatos);
    router.post('/datos-web', datosWeb.guardarDatos);

    
    // Categorias
    router.get('/nueva-categoria', categoriasController.formNuevaCategoria);
    router.post('/nueva-categoria', categoriasController.nuevaCategoria);
    router.get('/categorias', categoriasController.listadoCategorias)
    router.get('/categorias/borrar/:id', categoriasController.eliminarCategoria);
    router.get('/categorias/editar/:id', categoriasController.editarCategoria);
    router.post('/categorias/editar/:id', categoriasController.guardarCategoriaEditada);
    
    // Proyectos
    router.get('/proyectos', proyectosController.listadoProyectos);
    router.get('/nuevo-proyecto', proyectosController.formNuevoProyecto);
    router.post('/nuevo-proyecto', 
        proyectosController.upload.single('urlImagen'),
        proyectosController.guardarProyecto);
    router.get('/proyectos/borrar/:id', proyectosController.borrarProyecto);
    router.get('/proyectos/editar/:id', proyectosController.editarProyecto);
    router.post('/proyectos/editar/:id', proyectosController.guardarProyectoEditado);
    
    // Servicios
    router.get('/servicios', serviciosController.listadoServicios);
    router.get('/nuevo-servicio', serviciosController.formNuevoServicio);
    router.post('/nuevo-servicio', 
        serviciosController.upload.single('urlImagen'),
        serviciosController.guardarServicio);
    router.get('/servicios/borrar/:id', serviciosController.borrarServicio);
    router.get('/servicios/editar/:id', serviciosController.editarServicio);
    router.post('/servicios/editar/:id', serviciosController.guardarServicioEditado);


    // Testimonios
    router.get('/testimonios', testimoniosController.listadoTestimonios);
    router.get('/testimonios/nuevo', testimoniosController.formNuevoTestimonio);
    router.post('/testimonios/nuevo', testimoniosController.guardarNuevoTestimonio);
    router.get('/testimonios/borrar/:id', testimoniosController.borrarTestimonio);
    router.get('/testimonios/editar/:id', testimoniosController.editarTestimonio);
    router.post('/testimonios/editar/:id', testimoniosController.guardarTestimonioEditado);

    // Menú
    router.get('/back',
        (req, res) => {
            res.render('backHome')
        }
    );

    // Mailer
    router.post('/sendMail', mailerController.sendMail);
    
    // Usuarios
    router.get('/usuarios', usuariosController.listadoUsuarios);
    router.get('/usuarios/nuevo', usuariosController.formNuevoUsuario);
    router.post('/usuarios/nuevo', usuariosController.guardarNuevoUsuario);
    router.get('/usuarios/borrar/:id', usuariosController.borrarUsuario);
    router.get('/usuarios/editar/:id', usuariosController.editarUsuario);
    router.post('/usuarios/editar/:id', usuariosController.guardarUsuarioEditado);



    return router;
}