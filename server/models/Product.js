const mongoose = require('mongoose');
const { appConfig } = require('../config');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    // VALORACION: VER COMO HACERLO
    ratesByUser: [{
        userId: {
            type: String
        },
        value: {
            type: Number
        }
    }],
    rate: {
        type: Number,
        default: 0
    },

    imgUrl: {
        type: String
    },
    date_added: {
        type: Date,
        default: Date.now
    },
});

ProductSchema.methods.setImgUrl = function setImgUrl (filename) {
    const { host, port } = appConfig;
    this.imgUrl = `${host}:${port}/public/${filename}`
}

module.exports = Product = mongoose.model('product', ProductSchema);