const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    /*ROLES: COMO HACERLO
    role: {
        ['admin', 'client']
    }
    */
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true,'Escriba un e-mail'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Escriba una contraseña'],
        minlength: [6, 'La contraseña debe tener al menos 6 caractéres']
    },
    phoneNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    register_date: {
        type: Date,
        default: Date.now
    }
})

module.exports = User = mongoose.model('user',UserSchema);
