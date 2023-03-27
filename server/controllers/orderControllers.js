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

/*
module.exports.checkout = async (req,res) => {
    try{
        const userId = req.params.id;
        //recibimos una fuente como el cuerpo de la solicitud desde la interfaz para manejar Stripe
        const {source} = req.body;
        let cart = await Cart.findOne({userId});
        let user = await User.findOne({_id: userId});
        const email = user.email;
        if(cart){
            //Si el usuario tiene productos en el carrito
            //creamos con stripe un cargo con el monto, la moneda, el objeto de la fuente y el email de recibo
            const charge = await stripe.charges.create({
                amount: cart.bill,
                currency: 'ars',
                source: source,
                receipt_email: email
            })
            //se efectua pago
            if(!charge) throw Error('El pago ha fallado');
            if(charge){
                const order = await Order.create({
                    userId,
                    products: cart.products,
                    bill: cart.bill
                });
                //vaciamos el carrito
                const data = await Cart.findByIdAndDelete({_id:cart.id});
                return res.status(201).send(order);
            }
        }
        else{
            //Si el carrito esta vacio
            res.status(500).send("No tienes productos en el carrito");
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send("Algo salió mal");
    }
}


*/