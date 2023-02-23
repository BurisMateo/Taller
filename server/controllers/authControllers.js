const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config');
const bcrypt = require('bcrypt');

// Registro
module.exports.signup = (req,res) => {
    console.log(req);
    const { name, lastName, email, password, phoneNumber, address } = req.body;

    if(!name || !lastName || !email || !password || !phoneNumber || !address){
        res.status(400).json({msg: 'Ingrese todos los campos'});
    }

    User.findOne({email})
    .then(user => {
        if(user) return res.status(400).json({msg: 'El email ya tiene un usuario asignado'});

        const newUser = new User({ name, lastName, email, password, phoneNumber, address });
        newUser.save()
        /*
        // Creacion de contraseña encriptada
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                if(err) throw err;
                newUser.password = hash;
                newUser.save()
                    //Creamos un token JWT y enviarlo con los datos del usuario como respuesta
                    .then(user => {
                        jwt.sign(
                            { id: user._id },
                            config.get(config.jwtsecret),
                            { expiresIn: 3600 },
                            (err, token) => {
                                if(err) throw err;
                                res.json({
                                    token,
                                    user: {
                                        id: user._id,
                                        name: user.name,
                                        lastName: user.lastName,
                                        email: user.email,
                                        phoneNumber: user.phoneNumber,
                                        address: user.address
                                    }
                                });
                            }
                        )
                    });
            })
        })
        */
    })
};

// Inicio de sesión
module.exports.login = async (req,res) => {
    const { email, password } = req.body;
    if(!email || !password){
        res.status(400).json({msg: 'Ingrese todos los campos'});
    }
    User.findOne({email})
        .then(user => {
            if(!user) return res.status(400).json({msg: 'El usuario no existe'});

            //  Validación de la contraseña
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch) return res.status(400).json({ msg: 'Contraseña invalida'});

                    jwt.sign(
                        { id: user._id },
                        config.get('jwtsecret'),
                        { expiresIn: 3600 },
                        (err, token) => {
                            if(err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user._id,
                                    name: user.name,
                                    lastName: user.lastName,
                                    email: user.email,
                                    phoneNumber: user.phoneNumber,
                                    address: user.address
                                }
                            });
                        }
                    )
                })
        })
};

// Obtiene el usuario por su id en formato JSON
module.exports.get_user = (req,res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
}


module.exports.get_users = (req,res) => {
    User.find().sort({date:-1}).then(users => res.json(users));
}