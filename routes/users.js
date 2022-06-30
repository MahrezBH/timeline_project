const { Router } = require('express');
const userController = require('../controllers/user');

const router = Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/login', userController.login);
router.post('/logout', userController.logout);
router.delete('/delete', userController.delete);
router.put('/update', userController.update);

module.exports = router;