exports.home = (req,res) => {

    info = {
        queHacemos: 'Nos dedicamos a cortar el pasto pa',
        quienesSomos: 'El Cufa y el Mati',
        consultaGratis: 'Entrá en contacto con nosotros así preparamos un servicio acorde a tus necesidades y a tu presupuesto',
        nuestrosServicios: 'Nos dedicamos a trabajos de jardineria y mantenimiento',
        galeriaProyectos: 'A continuación podés ver la galería de nuestros trabajos realizados',
        contactanos: '¡Envianos un mensaje y vamos a responderte a la mayor brevedad posible!',
        datosEmpresa:{
            direccion:{
                calle: 'Pasaje Prioni x',
                ciudadProvincia: 'Rosario, Santa Fe',
            },
            horario:{
                semana: 'Lunes a Sábado: 07:00 - 18:00',
                especial: 'Domingo: Consultar'
            },
            infoContacto:{
                telefono: '3413 333 333',
                email: 'info@greenfacility.com.ar'
            },
            redes:{
                facebook: 'https://www.facebook.com/greenfacilitys',
                instagram: 'https://www.instagram.com/green_facility/'
            }
        }
    }



    res.render('home', info);
}
