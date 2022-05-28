const joi = require('joi');

exports.validateTransaction = (req, res, next) => {
    const schema = joi.object().keys({
        productid: joi.number().required(),
        quantity: joi.number().min(0).required(),
    });
    if (schema.validate(req.body).error) {
        res.json({ error: schema.validate(req.body).error.message });
    }
    else {
        next();
    }
};
