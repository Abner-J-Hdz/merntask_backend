const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    //Leer el token del header
    const token = req.header('x-auth-token');   

    //Revisar si no hay token
    if(!token){
        res.status(401).json({msg: 'No hay Token, permiso no valido'});
        return//para que no vaya al catch a verificar
        //ya que si esta vacio no hay necesidad de validar
    }

    //Validar el token
    try {
        //verificamos el token
        const cifrado = jwt.verify(token, process.env.SECRETA);
        //agregamos el nuevo campo como parte request, 
        //donde podremos obtener su id: req.usuario.id
        req.usuario = cifrado.usuario;
        next();//para que valla al siguiente middleware
    } catch (error) {
        res.status(401).json({msg : 'Token no valido'})
    }
}