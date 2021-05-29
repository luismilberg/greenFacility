const Testimonios = require('../models/Testimonios');


exports.listadoTestimonios = async (req,res) => {
    const testimonios = await Testimonios.find().lean();
    res.render('testimonios',{testimonios});
}

// Nuevo testimonio
exports.formNuevoTestimonio = (req, res) => {
    res.render('formNuevoTestimonio');
}

exports.guardarNuevoTestimonio = async (req, res) => {
    const testimonio = new Testimonios(req.body);
    await testimonio.save()
    res.redirect('/testimonios');
}

// Borrar testimonio
exports.borrarTestimonio = async (req, res) => {
    const id = req.params.id;
    await Testimonios.findByIdAndDelete(id);
    res.redirect('/testimonios');
}

// Editar testimonio
exports.editarTestimonio = async (req, res) => {
    const id = req.params.id;
    const testimonio = await Testimonios.findById(id).lean();
    res.render('formEditarTestimonio', testimonio);

}

exports.guardarTestimonioEditado = async (req, res) => {
    const testimonio = req.body;
    await Testimonios.findByIdAndUpdate(testimonio._id, testimonio);
    res.redirect('/testimonios');
}