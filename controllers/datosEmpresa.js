const DatosEmpresa = require('../models/DatosEmpresa');

exports.formDatos = async (req,res) => {
    const datosQuery = await DatosEmpresa.find().lean();
    const datosEmpresa = datosQuery[0];

    res.render('datosEmpresa', {
        datosEmpresa
    });
}

exports.guardarDatos = async (req, res) => {
    
    const datosEmpresa = req.body;

    const datosQuery = await DatosEmpresa.find();
    const datosGuardados = datosQuery[0];
   
    const resultado = await DatosEmpresa.findByIdAndUpdate(datosGuardados._id, datosEmpresa);
    
    res.redirect('/datos-empresa');


}