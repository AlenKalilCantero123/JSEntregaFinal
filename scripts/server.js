const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public')); // Sirve archivos estáticos si los tienes en una carpeta 'public'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tu_email@gmail.com', // Reemplaza con tu dirección de correo
        pass: 'tu_contraseña' // Reemplaza con tu contraseña
    }
});

app.post('/send-budget', (req, res) => {
    const { to, subject, text } = req.body;

    const mailOptions = {
        from: 'tu_email@gmail.com', // Reemplaza con tu dirección de correo
        to,
        subject,
        text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Presupuesto enviado');
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
