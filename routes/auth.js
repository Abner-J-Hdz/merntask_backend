//rutas para autenticar usuarios
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middlewares/auth');

const authController = require('../controllers/authController');

//Iniciar sesion
// api/auth
/* Las reglas de validacion se ponen como un array despues de la ruta,
 * sin embargo el resultado de las mismas se leen en el controlador
 */  
router.post('/',

            authController.autenticarUsuario
             
);

//obtiene usuarioautenticado
router.get('/', auth, authController.usuarioAutenticado)

module.exports = router;