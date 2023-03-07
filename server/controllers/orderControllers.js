const mercadopago = require('mercadopago');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const User = require('../models/User');
const config = require('../config');
require('dotenv').config();

module.exports.get_orders = async (req,res) => {

    const userId = req.params.id;
    Order.find({userId}).sort({date:-1}).then(orders => res.json(orders));

}


module.exports.checkout = async(req,res) => {

    mercadopago.configure({
        access_token :process.env.MERCADO_PAGO_KEY
    })
        
            const {prod , user} = req.body
            // Crea un objeto de preferencia
            let preference = {
                items: [
                {
                    title:prod.title,
                    unit_price: prod.price,
                    quantity: 1,
                    picture_url:`prod.url`,
                    currency_id:'ARS'
                }],
                payer:{
                    phone:user.phone,
                    identification:user.id,
                    address:user.address
                    }
        }
            mercadopago.preferences
                .create(preference)
                .then(function(response){
                    res.status(200).json({global:response.body.id})
                    window.location.href = response.init_point;
                    console.log(response.body);
                })
                .catch((error) => {
                    res.status(500).json({global:error})
            })
}