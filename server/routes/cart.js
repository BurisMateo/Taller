const { Router } = require('express');
const cartController = require('../controllers/cartControllers');
const router = Router();

router.post('/product/:id',cartController.add_cart_product);
router.get('/cart/:id',cartController.get_cart_products);
router.post('/cart/:id', cartController.add_cart_product);
router.delete('/cart/:userId/:productId', cartController.delete_product);

module.exports = router;