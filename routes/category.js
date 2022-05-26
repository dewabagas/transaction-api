const express = require('express');
const router = express.Router();
const controller = require('../controllers/category.controller');
const categories = require('../middlewares/categoryValidations');
const middleware = require('../middlewares/auth');

router.post('/', middleware.verify, categories.validatecategory, controller.addcategory);
router.get('/', middleware.verify, controller.getcategory);
router.patch('/:categoryid', middleware.verify, categories.validatecategory_update, controller.updatecategoryById);
router.delete('/:categoryid', middleware.verify, categories.params_categoryid, controller.deletecategory);

module.exports = router;