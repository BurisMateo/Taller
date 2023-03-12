const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { json } = require('express');


//obtener todos los usuarios
module.exports.get_users = async (req, res) => {
    User.find().sort({date:-1}).then(users => res.json(users));
}

//obtener un usuario
module.exports.get_userByID = async (req, res) => {
    console.log(req.user);
    const  { id } = req.user;

    if(id.length === 24) {
        User.findById(id).then((user) => {
            if(!user){
                return res.json({msg: 'Usuario no encontrado'})
            } else {
                const { _id, password, __v, ...resto} = user._doc
                res.json(resto)
            }
        })
    } else {
        res.json({msg: 'No se encontro ningun usuario con esa id'})
    }
}

//registro
module.exports.register = async (req, res) => {
    console.log(req.body);
    const {name, lastName, email, password, phoneNumber, address} = req.body;

    //buscamos si el email ya está registrado
    User.findOne({email}).then((user) => {
        if(user){
            return res.json({msg: 'El email ya está registrado'})
        }else if (!name || !lastName || !email || !password || !phoneNumber || !address){
            return res.json({msg: 'Ingrese todos los campos'})
        } else {
            bcrypt.hash(password, 10, (error, cryptedPassword) => {
                if(error) res.json({ error })
                else {
                    const newUser = new User ({
                        name,
                        lastName,
                        email,
                        password: cryptedPassword,
                        phoneNumber,
                        address
                    });

                    newUser.save()
                    .then((user) => {
                        res.json({msg: 'Usuario registrado', user})
                    })
                    .catch((error)=> console.error(error));
                }
            })
        }
    })
}

//login
module.exports.login = async (req, res) => {
    const { email, password } = req.body;

    User.findOne({email}).then((user) =>{
        if(!user){
            return res.json({msg: 'Usuario no encontrado'})
        }

        bcrypt.compare(password, user.password).then((isMatch) => {
            if(isMatch){
                const {id, name} = user;
                const data = {
                    id,
                    name
                };

                const token = jwt.sign(data, process.env.JWT_SECRET, {
                    expiresIn: '86400'
                });

                return res.json({user:{ id, name, token } })
            } else {
                return res.json({msg: 'contraseña incorrecta'})
            }
        })
    })
}

// updatear datos del usuario
module.exports.updateData = (req, res) => {

}