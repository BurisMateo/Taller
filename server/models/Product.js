const mongoose = require('mongoose');
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
    /* VALORACION: VER COMO HACERLO
    rate: {
        type: Number,
        required: true
    },

    IMAGEN: VER COMO HACERLO
    imgUrl: {
        type: String
    }

    
    */
    tags: {
        type: [String],
        required: true
    },

    date_added: {
        type: Date,
        default: Date.now
    },
});

module.exports = Product = mongoose.model('product', ProductSchema);