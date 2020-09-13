const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async (req, res) => {
    //Revisamos si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.json({errores: errores.array()})
    }

    //extraemos el email y pasword del request
    const { email, password } = req.body;

    try {
/**revisar que si el usuario está registrado */
        let usuario = await Usuario.findOne({ email });
        //si usuario esta vacio o no esta seteado
        if (!usuario) {
            return res.status(404).json({ msg: 'El usuario no existe'})
        }
/**revisamos la contraseña si es no correcta  */
        //comparamos el password que nos envian con el de base de datos
        const passCorrecto = await bcryptjs.compare(password, usuario.password);
        //si no esta seteado o es incorrecto
        if (!passCorrecto) {
            return res.status(400).json({msg: 'Password Incorrecto'})
        }
/**Si es correcta la contraseña */
        //crear y firmar un JWT
        const payload = {
            usuario:{
                id: usuario.id
            }
        };

        //firmar el JWT
        jwt.sign(payload, process.env.SECRETA,{
            expiresIn: 36000//1 hora = 3600
        }, (error, token) =>{
            if(error) throw error;

            //mensaje de confirmacion
            res.status(200).json({ msg: 'Login Exitoso',token});
            console.log('login existoso...');
        })

    } catch (error) {
        console.log(error);
    }
}

//obtiene el usuario autenticado
exports.usuarioAutenticado = async(req, res) =>{
    try {
        /**esta es la forma para no selecionar un campo con "-" 
         * mas el nombre del campo que no queremos seleccionar
         * select('-password') */
        const usuario = await Usuario.findById(req.usuario.id).select('-password');
        res.status(200).send({msg: 'Se obtuvo el usuario', usuario});
    } catch (error) {
        console.log(error);
        res.status(500).send({msg: 'Hubo un error'});
    }
}