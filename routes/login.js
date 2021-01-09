let express = require('express');
let router = express.Router();
let usuarioModel = require('./../models/usuarioModel');

router.get('/', function (req, res, next) {
  res.render('admin/login', {
    layout:'admin/layout'
  });
});

router.get('/logout', function(req, res, next){
  req.session.destroy();
  res.render('admin/login', {
    layout: 'admin/layout'
  });
});

router.post('/', async (req, res, next) => {
  try {
    let usuario = req.body.usuario; 
    let password = req.body.password; 

    let data = await usuarioModel.getUserByUsernameAndPassword(usuario, password); 

    if (data != undefined) {  
      req.session.id_usuario = data.id;
      req.session.nombre = data.usuario;
      res.redirect('/admin/novedades'); 
    } else {
      res.render('admin/login', {
        layout: 'admin/layout', 
        error: true 
      });
    }
  } catch (error) {
      console.log(error);
  }
}); 


module.exports = router;
