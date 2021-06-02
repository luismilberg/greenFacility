const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "792ecea8d8c1d0",
      pass: "6d8fcaa1d892d8"
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
      from: '"Consulta Web" <consultaweb@greenfacility.com.ar"',
      to: 'luismilberg@gmail.com',
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