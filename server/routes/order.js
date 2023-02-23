const { Router } = require('express');
const orderController = require('../controllers/orderControllers');
const router = Router();
//require('dotenv').config()

//const mercadopago = require('mercadopago');

router.get('/order/:id', orderController.get_orders);
router.post('/order/:id', orderController.checkout);
/*
mercadopago.configure(access_token= process.env.MERCADOPAGO_KEY)


router.post("/pago", (req, res)=>{
    const product = req.body
    let preference = {
        items:[{
            id: 123,
            title: product.title,
            currency_id: 'ARS',
            picture_url: product.image,
            description: product.description,
            category_id: "art",
            quantity: 1,
            unit_price: product.price
        }],
        back_urls:{
            success:'https://localhost:3000',
            failure: '',
            pending: ''
        },
        auto_return: 'approved',
        binary_mode: true
    }
    mercadopago.preferences.create(preference).then((response)=> res.status(200).send({response})).catch((error)=>res.status(400).send({error: error.message}))
})
*/
module.exports = router;