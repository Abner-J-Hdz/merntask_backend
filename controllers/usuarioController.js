const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

const jwt = require('jsonwebtoken');

//crear un nuevo usuario
exports.createUsuario = async (req, res) => {

    //Revisamos si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()})
    }

    //extraer email y pasword
    const { email, password } = req.body;

    try {
        //revisar que el usuario registrado sea unico
        let usuario = await Usuario.findOne({ email });
        if(usuario){
            return res.status(403).json({msg : 'El usuario ya existe'});
        }
        //crear instancia de usuario y crea un nuevo usuario
        usuario = new Usuario(req.body);

        //hashear el password
        const salt = await bcryptjs.genSalt(10);//creacion del salt
        usuario.password = await bcryptjs.hash(password, salt);//pasamo primero el pass y luego el salt

        //guardar el nuevo usuario
        await usuario.save();

        //crear y firmar un JWT
        const payload = {
            usuario:{
                id: usuario.id
            }
        };

        //firmar el JWT
        jwt.sign(payload, process.env.SECRETA,{
            expiresIn: 3600
        }, (error, token) =>{
            if(error) throw error;

            //mensaje de confirmacion
            res.status(200).json({token});
        })

        

    } catch (error) {
        console.log(error);
        res.status(403).send('Hubo un error')
    }    
}
