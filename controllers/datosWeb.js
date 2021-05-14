const DatosWeb = require('../models/DatosWeb');

exports.formDatos = async (req,res) => {
    const datosQuery = await DatosWeb.find().lean();
    const datosWeb = datosQuery[0];

    res.render('datosWeb', {
        datosWeb
    });
}

exports.guardarDatos = async (req, res) => {
    
    const datosEmpresa = req.body;

    const datosQuery = await DatosWeb.find();
    const datosGuardados = datosQuery[0];
   
    const resultado = await DatosWeb.findByIdAndUpdate(datosGuardados._id, datosEmpresa);
    
    res.redirect('/datos-web');


}