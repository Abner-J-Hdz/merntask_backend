const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');
//crear el servidor
const app =  express();
 
//conectar a la base de datos
conectarDB();    ///hjsdghj   

//Habilitar cors
app.use(cors());

//Habilitar express.js
app.use(express.json({extended: true}));

//punto de la app
const port = process.env.PORT || 4000;

const usuarios = require('./routes/usuarios');
const auth = require('./routes/auth');
const proyectos = require('./routes/proyectos');
const tareas = require('./routes/tareas');

//importar rutas
app.use('/api/usuarios', usuarios);
app.use('/api/auth', auth);
app.use('/api/proyectos', proyectos);
app.use('/api/tareas', tareas);


//arrancar la app
app.listen(port,'0.0.0.0' ,() => {
    console.log(`El servidor está corriendo el puerto ${port}`);
});


/**
 * cadena de conexxion a mongo db = localhost:27017
 * mongodb://${IP_SERVER}:${PORT_DB}/anrwebpersonalbd
 * mongodb://localhost:27017/merntasks
 */
