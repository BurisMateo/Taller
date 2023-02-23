const config = require('config');
const jwt = require('jsonwebtoken');

// verifica si un usuario ha iniciado sesión o no
function auth(req, res, next) {
    //Obtenemos el token de autorización
    const token = req.header('x-auth-token');

    // Comprueba si hay token
    if(!token){
        return res.status(401).json({ msg: 'Sin token, autorización denegada'});
    }
    
    try{
        // Verificación del token
        const decoded = jwt.verify(token, config.jwtsecret);
        //Agrega al usuario al payload (carga util)
        req.user = decoded;
    next();
    } catch(e){
        res.status(400).json({ msg:'El token no es válido'});
    }
}

module.exports = auth;