const express = require('express');
const router = express.Router();
const controller = require('../controllers/transactionHistory.controller');
const transactions = require('../middlewares/transactionValidations');
const middleware = require('../middlewares/auth');

router.post('/', middleware.verify, middleware.verifyAdmin, transactions.validateTransaction, controller.addTransaction);
router.get('/user', middleware.verify, middleware.verifyAdmin, transactions.validateTransaction, controller.getTransactionsUser);
router.get('/admin', middleware.verify, middleware.verifyAdmin, transactions.validateTransaction, controller.getTransactionsAdmin);
router.get('/:transactionid', middleware.verify, middleware.verifyAdmin, transactions.validateTransaction, controller.getTransaction);

module.exports = router;