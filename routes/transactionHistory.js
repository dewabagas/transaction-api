const express = require('express');
const router = express.Router();
const controller = require('../controllers/transactionHistory.controller');
const transactions = require('../middlewares/transactionValidations');
const middleware = require('../middlewares/auth');

router.post('/', middleware.verify, middleware.verifyAdmin, transactions.validateTransaction, controller.addTransaction);

module.exports = router;