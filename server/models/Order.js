const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    userId: {
        type: String,
    },
    products: [{
        productId: {
            type: String,
        },
        name: String,
        quantity: {
            type: Number,
            required: true,
            min: [1, 'La cantidad no puede ser menor a 1.']
        },
        price: Number
    }],
    bill: {
        type: Number,
        required: true
    },
    /*ESTADO: VER COMO USARLO
    state: {
        ['en espera', 'preparando', 'enviado', 'demorado', 'cancelado', 'finalizado']
    }
    */
    date_added: {
        type: Date,
        default: Date.now
    }
})

module.exports = Order = mongoose.model('order', OrderSchema);