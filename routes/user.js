const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller')
const user = require('../middlewares/userValidations');
const middleware = require('../middlewares/auth')

router.post('/register', user.validateUserRegister, controller.register);
router.post('/login', user.validateUserLogin, controller.login);
router.put('/:userId', middleware.verify, middleware.authorization, user.validateUserUpdate, controller.editUser);
router.delete('/:userId', middleware.verify, middleware.authorization, controller.deleteUser);
router.patch('/topup/:userId', middleware.verify, middleware.authorization, user.validateTopup, controller.topupBalance);
module.exports = router;