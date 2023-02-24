const { Router } = require('express');
const userController = require('../controllers/userControllers');
const router = Router();

router.get('/users', userController.get_users);
router.get('/user/:id', userController.get_userByID);
router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;