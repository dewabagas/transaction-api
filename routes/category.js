const express = require('express');
const router = express.Router();
const controller = require('../controllers/category.controller');
const categories = require('../middlewares/categoryValidations');
const middleware = require('../middlewares/auth');

router.post('/', middleware.verify, middleware.verifyAdmin, categories.validatecategory, controller.addCategory);
router.get('/', middleware.verify, controller.getCategory);
router.patch('/:categoryid', middleware.verify, middleware.verifyAdmin, categories.validatecategory_update, controller.updateCategoryById);
router.delete('/:categoryid', middleware.verify, middleware.verifyAdmin, categories.params_categoryid, controller.deleteCategory);

module.exports = router;