const express = require('express');
const router = express.Router();

// Controladores
const homeController = require('../controllers/homeController');
const datosEmpresa = require('../controllers/datosEmpresa');
const datosWeb = require('../controllers/datosWeb');

module.exports = () => {
    router.get('/', homeController.home);
    router.get('/cargar-datos', homeController.cargaDatosInicial);

    // Datos empresa
    router.get('/datos-empresa', datosEmpresa.formDatos);
    router.post('/datos-empresa', datosEmpresa.guardarDatos);

    // Datos web
    router.get('/datos-web', datosWeb.formDatos);
    router.post('/datos-web', datosWeb.guardarDatos);

    return router;
}