var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var novedadesModel = require('../models/novedadesModel');

router.get('/', async function (req, res, next) {
  var novedades = await novedadesModel.getNovedades();
  res.render('index', {
    novedades
      });  
});

router.post('/', async (req, res, next) => {
  console.log(req.body);
  var nombre = req.body.nombre;
  var email = req.body.email;
  var tel = req.body.tel;
  var mensaje = req.body.mensaje;
 
 
 //datos mail
var obj = {
  to: 'jpazul12@gmail.com',
  subjet: 'CONTACTO WEB',
  html: nombre + ' se contacto a traves de la web y quiere mas información a este correo: '
  + email + ' .<br> Ademas, hizo este comentario: ' + mensaje + '. <br> Su tel es: ' + tel
}
var transport = nodemailer.createTransport({
host: process.env.SMTP_HOST,
port: process.env.SMTP_PORT,
auth: {
user: process.env.SMTP_USER,
pass: process.env.SMTP_PASS}
});
var info = await transport.sendMail(obj);
res.render('index', {
  message:'Mensaje enviado correctamente'
})
});





module.exports = router;
