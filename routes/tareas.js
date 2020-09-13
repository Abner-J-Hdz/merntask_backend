const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');
const auth = require('../middlewares/auth');
const { check } = require('express-validator');

//ccrear tarea
//api/tarea
router.post('/',auth, 
            [
              check('nombre', 'El Nombre es obligatorio').not().isEmpty(),
              check('proyecto', 'El Proyecto es obligatorio').not().isEmpty(),

            ], tareaController.crearTarea
);

// Obtener las tareas por proyecto
router.get('/',auth, tareaController.obtenerTareas);

router.put('/:id', auth,
        [], tareaController.actualizarTarea);

router.delete('/:id', auth, tareaController.eliminarTarea)
     
module.exports = router;

//Obtener las tareas por proyecto
/*[
    check('proyecto', 'El Proyecto es obligatorio').not().isEmpty(),
],*/
