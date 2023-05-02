const { Router } = require('express');
const userController = require('../controllers/userControllers');
const router = Router();
const verifyToken = require('../middleware/verifyToken');


router.get('/users', userController.get_users);
router.get('/user', verifyToken, userController.get_userByID);
router.get('/usere', userController.get_userByEmail);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.put('/profile',userController.updateData);

module.exports = router;