const { Router } = require('express');
const favoriteController = require('../controllers/favoriteControllers');
const router = Router();

router.get('/favorite/:id',favoriteController.get_fav_products);
router.post('/favorite/:id', favoriteController.add_fav_product);
router.delete('/favorite/:userId/:productId', favoriteController.delete_product);

module.exports = router;



/**
 * VER COMO HACERLO
 * 
 */