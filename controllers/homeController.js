const DatosEmpresa = require('../models/DatosEmpresa');
const DatosWeb = require('../models/DatosWeb');
const Servicio = require('../models/Servicios');
const Testimonios = require('../models/Testimonios');
const Proyectos = require('../models/Proyectos');
const Categoria = require('../models/Categoria');

exports.cargaDatosInicial = async(req, res)=> {

    const datosEmpresaSave = new DatosEmpresa({
        direccionCalle: 'Pasaje Prioni x',
        direccionCiudadProvincia: 'Rosario, Santa Fe',
        horarioSemana: 'Lunes a Sábado: 07:00 - 18:00',
        horarioEspecial: 'Domingo: Consultar',
        infoContactoTelefono: '3413 333 333',
        infoContactoEmail: 'info@greenfacility.com',
        redesFacebook: 'https://www.facebook.com/greenfacilitys',
        redesInstagram: 'https://www.instagram.com/green_facility/'
    });

    await datosEmpresaSave.save(); // Descomentar para hacer el save inicial en testing

    const datosWebSave = new DatosWeb({
        queHacemos: 'Nos dedicamos a cortar el pasto pa',
        quienesSomos: 'El Cufa y el Mati',
        consultaGratis: 'Entrá en contacto con nosotros así preparamos un servicio acorde a tus necesidades y a tu presupuesto',
        nuestrosServicios: 'Nos dedicamos a trabajos de jardineria y mantenimiento',
        galeriaProyectos: 'A continuación podés ver la galería de nuestros trabajos realizados',
        contactanos: '¡Envianos un mensaje y vamos a responderte a la mayor brevedad posible!'
    });

    await datosWebSave.save(); // Descomentar para hacer el save inicial en testing

    const serviciosSave = new Servicio({
        urlImagen: 'testUrlImagen.jpg',
        titulo: 'Limpieza de otoño',
        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at.'
    });

    await serviciosSave.save(); // Descomentar para hacer el save inicial en testing

    const testimoniosSave = new Testimonios({
        testimonio:'Cumplieron nuestras expectativas, muy recomendables',
        responsable: 'Maxi Rodriguez, Newells Old Boys'
    });

    await testimoniosSave.save(); // Descomentar para hacer el save incial en testing

}

exports.home = async (req,res) => {

    // Consulta para los testimonios
    const testimonios = await Testimonios.find().lean();

    // Consulta para los servicios brindados
    const servicios = await Servicio.find().lean();

    // Consulta para los datos de la empresa
    const datosEmpresaQuery = await DatosEmpresa.find();
    const datosEmpresa = datosEmpresaQuery[0];

    // Consulta para los datos de la web
    const datosWebQuery = await DatosWeb.find();
    const datosWeb = datosWebQuery[0];

    // Proyectos
    const proyectos = await Proyectos.find().lean();

    // Categorias
    const categorias = await Categoria.find().lean();

    let whatsapp = datosEmpresa.infoContactoTelefono.replace(' ', ''); //quitar espacios
    whatsapp = whatsapp.replace('+54',''); //quitar código de país en caso de que lo tenga
    whatsapp = `+54${whatsapp}`; //agregar código de país
 

    info = {
        proyectos,
        categorias,
        queHacemos: datosWeb.queHacemos,
        quienesSomos: datosWeb.quienesSomos,
        consultaGratis: datosWeb.consultaGratis,
        nuestrosServicios: datosWeb.nuestrosServicios,
        galeriaProyectos: datosWeb.galeriaProyectos,
        contactanos: datosWeb.contactanos,
        datosEmpresa:{
            direccion:{
                calle: datosEmpresa.direccionCalle,
                ciudadProvincia: datosEmpresa.direccionCiudadProvincia,
            },
            horario:{
                semana: datosEmpresa.horarioSemana,
                especial: datosEmpresa.horarioEspecial
            },
            infoContacto:{
                telefono: datosEmpresa.infoContactoTelefono,
                email: datosEmpresa.infoContactoEmail,
                whatsapp
            },
            redes:{
                facebook: datosEmpresa.redesFacebook,
                instagram: datosEmpresa.redesInstagram
            }
        },
        servicios,
        testimonios
    }



    res.render('home', info);
}
