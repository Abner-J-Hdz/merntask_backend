const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
const auth = require('../middlewares/auth');
const { check } = require('express-validator');

//crea proyectos
//api/proyectos
router.post('/',auth,[
                check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
            ], 
            proyectoController.crearProyecto);

//Obtener Proyectos
router.get('/',
            auth, 
            proyectoController.obtenerProyectos);

//actualizar Proyecto
router.put('/:id',auth, 
            [
                check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
            ],
            proyectoController.actualizarProyecto);

//Eliminar Proyecto
router.delete('/:id',
            auth, 
            proyectoController.eliminarProyecto);

module.exports = router;