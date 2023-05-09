const { Router } = require('express');
const productController = require('../controllers/productControllers');
const upload = require('../libs/storage');
const router = Router();

router.get('/products', productController.get_products);
router.post('/products', upload.single('image'), productController.post_product);
router.put('/products/:id', productController.update_product);
router.delete('/products/:id',productController.delete_product);
router.get('/product/:id', productController.get_Product);

module.exports = router;