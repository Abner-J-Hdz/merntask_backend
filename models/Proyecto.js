const mongoose = require('mongoose');

const ProyectoSchema = mongoose.Schema({
    nombre: {
        type:String,
        required: true,
        trim: true
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    creado:{
        type: Date,
        default: Date.now()
    }
});
/* con type: mongoose.Schema.Types.ObjectId, lo que hacemos 
   es una relacion entre dos tablas*/
/* ref: 'Usuario' esto para indicar a que tabla 
 * se está haciendo la relacion, el ref debe tener el mismo
 * de la tabla, tal cual */
module.exports = mongoose.model('Proyecto', ProyectoSchema);