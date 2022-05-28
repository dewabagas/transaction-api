const express = require('express');
const router = express.Router();
const controller = require('../controllers/product.controller');
const product = require('../middlewares/productValidations');
const middleware = require('../middlewares/auth');

router.post('/', middleware.verify, product.validateProduct, controller.addProduct);
router.get('/', middleware.verify, controller.getProduct);
router.put('/:productid', middleware.verify, controller.editProduct);
router.patch('/:productid', middleware.verify, product.validateProduct_patch, controller.editProductCategory);
router.delete('/:productid', middleware.verify, product.params_productid, controller.deleteProduct);

module.exports = router;