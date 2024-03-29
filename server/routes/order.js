const { Router } = require('express');
const orderController = require('../controllers/orderControllers');
const router = Router();

router.get('/order/:id', orderController.get_orders);
router.get('/orders', orderController.get_pendingOrders);
router.get('/order-history', orderController.get_historyOrders);
router.post('/order/:id', orderController.checkout);
router.put('/order/:id', orderController.finish_order); //pasamos id de pedido

module.exports = router;