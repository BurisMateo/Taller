const { Router } = require('express');
const productController = require('../controllers/productControllers');
const router = Router();

router.get('/products', productController.get_products);
router.post('/products', productController.post_product);
router.put('/products/:id', productController.update_product);
router.delete('/products/:id',productController.delete_product);

module.exports = router;