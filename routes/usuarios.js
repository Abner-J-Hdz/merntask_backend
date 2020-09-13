//rutas para rear usuarios
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const usuarioController = require('../controllers/usuarioController')

//Crea un usuario
// api/usuarios
/* Las reglas de validacion se ponen como un array despues de la ruta,
 * sin embargo el resultado de las mismas se leen en el controlador
 */
router.post('/',
            [
                check('nombre', 'El nombre es obligatorio').not().isEmpty(),
                check('email', 'Agrega un email valido').isEmail(),
                check('password', 'El password debde se minimo de 6 caracteres').isLength({min: 6})
            ],
            usuarioController.createUsuario
);

module.exports = router;
