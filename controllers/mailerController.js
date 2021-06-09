const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: "c2181302.ferozo.com",
    port: 465,
    auth: {
      user: "contacto@greenfacility.com.ar",
      pass: process.env.PASSMAIL
    }
  });

  exports.sendMail = async (req, res) => {
    const email = req.body;
    console.log(email);
    const html = `
    <p>Nombre: ${email.name}</p>
    <p>Email: ${email.email}</p>
    <p>Teléfono: ${email.phone}</p><br>
    <p>Mensaje: ${email.message}</p><br>

    `;

    const info = await transporter.sendMail({
      from: '"Consulta Web" <contacto@greenfacility.com.ar>',
      to: 'contacto@greenfacility.com.ar',
      subject: 'Consulta generada en la web',
      text: 'Texto de la consulta',
      html
    });
    console.log(info.messageId);

    if(info.messageId){
      res.status(200).json({status: 'OK'});
    } else {
      res.status(500);
    }


  }