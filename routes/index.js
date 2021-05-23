const express = require('express');
const router = express.Router();

// Controladores
const homeController = require('../controllers/homeController');
const datosEmpresa = require('../controllers/datosEmpresa');
const datosWeb = require('../controllers/datosWeb');
const serviciosController = require('../controllers/serviciosController');
const categoriasController = require('../controllers/categoriasController');

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
    router.get('/nuevo-servicio', serviciosController.formNuevoServicio);
    router.post('/nuevo-servicio', serviciosController.guardarServicio);

    // Categorias
    router.get('/nueva-categoria', categoriasController.formNuevaCategoria);
    router.post('/nueva-categoria', categoriasController.nuevaCategoria);

    // Menú
    router.get('/menu', (req,res) => {
        res.render('menu');
    });
    router.post('/menu', (req,res) => {
        console.log(req.body);
    })

    return router;
}