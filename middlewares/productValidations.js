const joi = require('joi');

exports.validateProduct = (req, res, next) => {
    const schema = joi.object().keys({
        title: joi.string().required(),
        price: joi.number().min(0).max(50000000).required(),
        stock: joi.number().min(5).required(),
        categoryid: joi.number().required(),
    });
    if (schema.validate(req.body).error) {
        res.json({ error: schema.validate(req.body).error.message });
    }
    else {
        next();
    }
};

exports.validateProduct_update = (req, res, next) => {

};

exports.validateProduct_patch = (req, res, next) => {
    const schema = joi.object().keys({
        categoryid: joi.number().required(),
    });
    if (schema.validate(req.body).error) {
        res.json({ error: schema.validate(req.body).error.message });
    }
    else {
        next();
    }
};

exports.params_productid = (req, res, next) => {
    const schema = joi.object().keys({
        productid: joi.number().required(),
    });
    if (schema.validate(req.params).error) {
        res.json({ error: schema.validate(req.params).error.message });
    }
    else {
        next();
    }
};