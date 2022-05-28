const bcrypt = require('bcrypt');
const db = require("../config/db");
const User = require("../models/index").User;
const { generateToken } = require("../middlewares/auth");

exports.register = async (req, res) => {
    const { full_name, email, password, gender, role, balance } = req.body;

    User.findOne({
        where: {
            email: email
        }
    }).then(user => {
        if (user) {
            return res.status(400).send({
                message: 'Email or Username already exist'
            })
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        User.create({
            full_name: full_name,
            email: email,
            password: hash,
            gender: gender,
            role: role,
            balance: balance,
        }).then(user => {
            const token = generateToken({
                id: user.id,
                full_name: user.full_name,
                email: user.email,
                gender: user.gender,
                role: user.role,
                balance: user.balance,
            })

            res.status(201).send({
                status: 'SUCCESS',
                message: 'User created',
                result: user,
                token: token,
            })
        }).catch(error => {
            console.log("error", error)
            res.status(503).send({
                status: 'FAILED',
                message: 'user creation failed'
            })
        })
    })
}

exports.login = async (req, res) => {
    const { email, password } = req.body;

    User.findOne({
        where: {
            email: email
        }
    }).then(user => {
        if (!user) {
            return res.status(400).send({
                message: 'Email not found'
            })
        }

        const isValid = bcrypt.compareSync(password, user.password);

        if (!isValid) {
            return res.status(400).send({
                message: 'Email and password not match'
            })
        }

        const token = generateToken({
            id: user.id,
            full_name: user.full_name,
            email: user.email,
            username: user.username,
            profile_image_url: user.profile_image_url,
            age: user.age,
            phone_number: user.phone_number,
        })
        res.status(200).send({
            status: 'SUCCESS',
            message: 'Login Success',
            token: token
        })
    })
}

exports.editUser = async (req, res) => {
    const { full_name, email } = req.body;

    User.findOne({
        where: { id: req.params.userId },
    }).then(result => {
        if (result) {

            User.update({
                full_name: full_name,
                email: email,
            }, {
                where: { id: req.params.userId }
            }).then(user => {
                res.status(200).send({
                    status: 'SUCCESS',
                    message: 'User updated',
                    result: user
                })
            })
        } else {
            res.status(404).send({
                status: "FAILED",
                message: "User not found"
            })
        }
    }).catch(error => {
        res.status(503).send({
            status: "FAILED",
            message: `${error}`
        })
    })

}

exports.deleteUser = async (req, res) => {

    User.findOne({
        where: {
            id: req.params.userId
        }
    }).then(result => {
        if (result) {
            User.destroy({ where: { id: req.params.userId } }).then(user => {
                res.status(200).send({
                    status: 'SUCCESS',
                    message: 'User Deleted',
                    result: user
                })
            })
        } else {
            res.status(404).send({
                status: "FAILED",
                message: "User not found"
            })
        }
    }).catch(error => {
        res.status(503).send({
            status: "FAILED",
            message: `${error}`
        })
    })

}