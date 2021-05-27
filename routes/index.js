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

module.exports = () => {
    router.get('/', homeController.home);
    router.get('/cargar-datos', homeController.cargaDatosInicial);

    // Datos empresa
    router.get('/datos-empresa', datosEmpresa.formDatos);
    router.post('/datos-empresa', datosEmpresa.guardarDatos);

    // Datos web
    router.get('/datos-web', datosWeb.formDatos);
    router.post('/datos-web', datosWeb.guardarDatos);

    // Servicios
    router.get('/servicios', serviciosController.listadoServicios);
    router.get('/nuevo-servicio', serviciosController.formNuevoServicio);
    router.post('/nuevo-servicio', serviciosController.guardarServicio);

    // Categorias
    router.get('/nueva-categoria', categoriasController.formNuevaCategoria);
    router.post('/nueva-categoria', categoriasController.nuevaCategoria);
    router.get('/categorias', categoriasController.listadoCategorias)

    // Proyectos
    router.get('/proyectos', proyectosController.listadoProyectos)

    // Testimonios
    router.get('/testimonios', testimoniosController.listadoTestimonios)

    // Menú
    router.get('/back', (req,res) => {
        res.render('backHome');
    });
    

    return router;
}