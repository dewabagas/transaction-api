var jwt = require('jsonwebtoken');
let privateKey = 'helloworld';

const verify = async (req, res, next) => {
    const token = req.headers["token"]
    jwt.verify(token, privateKey, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                err: 'Token is Not Valid'
            })
        }
        req.user = decoded;

        next();
    });
}

const authorization = async (req, res, next) => {
    const token = req.headers["token"]
    jwt.verify(token, privateKey, (err, decoded) => {
        console.log('decoded', decoded);
        if (req.params.userId != decoded.id) {
            return res.status(403).send({
                err: 'Forbidden'
            })
        }
        next();
    });
}

const verifyAdmin = async (req, res, next) => {
    const token = req.headers["token"]
    jwt.verify(token, privateKey, (err, decoded) => {

        if (decoded.role != 1) {
            return res.status(403).send({
                err: 'Forbidden, Admin Only'
            })
        }
        next();
    })
}

const verifyAdminUser = async (req, res, next) => {
    const token = req.headers["token"]
    jwt.verify(token, privateKey, (err, decoded) => {
        console.log('decoded', res);
        console.log('params', req.user);

        if (decoded.role != 1 && req.user.id == decoded.id) {
            next();
        } else if (decoded.role != 1 && req.user.id != decoded.id) {
            return res.status(403).send({
                err: 'Forbidden, Admin & User related Only'
            })
        }
    })
}

const generateToken = (payload) => {
    return jwt.sign(payload, privateKey, {
        algorithm: 'HS256',
        expiresIn: "1h"
    });
}

module.exports = {
    generateToken,
    verify,
    authorization,
    verifyAdmin,
    verifyAdminUser
};

