const Tarea =  require('../models/Tarea');
const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator')
//Crea un nuevo Proyecto
exports.crearTarea = async(req, res) => {
    //Revisarsi hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()})
    }

    //Extraer el proyecto para ver si existe
    const { proyecto } = req.body;
    console.log(req.body);
    try {
        const proyectoVerificar = await Proyecto.findById(proyecto);
        if(!proyectoVerificar){
            return res.status(404).send({msg: "Proyecto no encontrado"});
        }

        //Revisar si el proyecto actual pertenece al usuario autenticado
        if(proyectoVerificar.creador.toString() !== req.usuario.id){
            return res.status(401).send({msg: "No autorizado"});
        }

        //creamos la tarea
        const tarea =  new Tarea(req.body);
        await tarea.save();
        res.status(200).send({msg: "Tarea Creada", tarea})

    } catch (error) {
        console.log(error);
        res.status(500).send({msg: "Hubo un error", error})
    }

}

// Obtiene las tareas por proyecto
exports.obtenerTareas = async (req, res) => {

    try {
        // Extraer el proyecto y comprobar si existe
        const { proyecto } = req.query;//significa que se debe enviar a la api como params
        console.log(req.query);

        const existeProyecto = await Proyecto.findById(proyecto);
        if(!existeProyecto) {
            return res.status(404).json({msg: 'Proyecto no encontrado'})
        }

        // Revisar si el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({msg: 'No Autorizado'});
        }

        // Obtener las tareas por proyecto
        const tareas = await Tarea.find({ proyecto }).sort({ _id:-1 });
        res.json({ tareas });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// Actualiza una tarea

exports.actualizarTarea = async(req, res) => {
    try {
        // Extraer el proyecto y comprobar si existe
        const { proyecto, nombre, estado } = req.body;

        const existeProyecto = await Proyecto.findById(proyecto);
        /*
        if(!existeProyecto) {
            return res.status(404).json({msg: 'Proyecto no encontrado'})
        }*/
        //Revisar si la tarea existe o no
        const tareaExiste = await Tarea.findById(req.params.id);

        if(!tareaExiste){
            return res.status(404).json({msg: 'La tarea no exste'})
        }
        // Revisar si el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({msg: 'No Autorizado'});
        } 
        
        //Crear un objeto con la nueva informacion
        const nuevaTarea = {};

        nuevaTarea.nombre = nombre;
        
        nuevaTarea.estado = estado;
        

        //Guardar tarea
        const tarea =  await Tarea.findOneAndUpdate({_id : req.params.id}, nuevaTarea, {
            new: true
        });
        res.status(200).send({ msg:"Se actualizó la tarea", tarea});

    } catch (error) {
       console.log(error); 
       res.status(500).send({mgs:"Hubo un error"});
    }
}

exports.eliminarTarea = async (req, res) => {
    try {
        // Extraer el proyecto y comprobar si existe
        const { proyecto } = req.query;
        console.log(proyecto);
        const existeProyecto = await Proyecto.findById(proyecto);
        /*
        if(!existeProyecto) {
            return res.status(404).json({msg: 'Proyecto no encontrado'})
        }*/
        //Revisar si la tarea existe o no
        const tareaExiste = await Tarea.findById(req.params.id);

        if(!tareaExiste){
            return res.status(404).json({msg: 'La tarea no exste'})
        }
        // Revisar si el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({msg: 'No Autorizado'});
        }

        //Obtener la tarea
        const tarea =  await Tarea.findById({_id : req.params.id});

        //Eliminar la tarea
        await Tarea.findOneAndDelete({_id : req.params.id});

        res.status(200).send({ msg:"Tarea Eliminada", tarea});

    } catch (error) {
       console.log(error); 
       res.status(500).send({mgs:"Hubo un error"});
    }   
}