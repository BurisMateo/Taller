const { Router } = require('express');
const userController = require('../controllers/userControllers');
const router = Router();
const verifyToken = require('../middleware/verifyToken');


router.get('/users', userController.get_users);
router.get('/user', verifyToken, userController.get_userByID);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', verifyToken, (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ msg: 'Sesión cerrada!' });
});

module.exports = router;