const joi = require('joi');

exports.validatecategory = (req, res, next) => {
    const schema = joi.object().keys({
        type: joi.string().required(),
    });
    if (schema.validate(req.body).error) {
        res.json({ error: schema.validate(req.body).error.message });
    }
    else {
        next();
    }
};

exports.validatecategory_update = (req, res, next) => {
    const schema = joi.object().keys({
        type: joi.string().required(),
    });
    if (schema.validate(req.body).error) {
        res.json({ error: schema.validate(req.body).error.message });
    }
    else {
        next();
    }
};

exports.params_categoryid = (req, res, next) => {
    const schema = joi.object().keys({
        categoryid: joi.number().required(),
    });
    if (schema.validate(req.params).error) {
        res.json({ error: schema.validate(req.params).error.message });
    }
    else {
        next();
    }
};