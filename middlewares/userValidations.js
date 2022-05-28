
const Joi = require('joi')

exports.validateUserRegister = async (req, res, next) => {
    const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        full_name: Joi.string().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(6).max(8).required(),
        gender: Joi.string().valid('male', 'female').required(),
        role: Joi.number().integer().valid(1, 2).required(),
        balance: Joi.number().min(0).max(50000000).required(),
    });
    if (schema.validate(req.body).error) {
        res.json({ error: schema.validate(req.body).error.message });
    } else {
        next();
    }
};

exports.validateUserLogin = async (req, res, next) => {
    const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(6).required(),
    });
    if (schema.validate(req.body).error) {
        res.json({ error: schema.validate(req.body).error.message });
    } else {
        next();
    }
};

exports.validateUserUpdate = async (req, res, next) => {
    const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        full_name: Joi.string().required(),
    });
    if (schema.validate(req.body).error) {
        res.json({ error: schema.validate(req.body).error.message });
    } else {
        next();
    }
};

exports.validateTopup = async (req, res, next) => {
    const schema = Joi.object().keys({
        balance: Joi.number().min(10000).max(50000000).required(),
    });
    if (schema.validate(req.body).error) {
        res.json({ error: schema.validate(req.body).error.message });
    } else {
        next();
    }
}