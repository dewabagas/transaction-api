const bcrypt = require('bcrypt');
const db = require("../config/db");
const User = require("../models/index").User;
const { generateToken } = require("../middlewares/auth");

exports.register = async (req, res) => {
    const { full_name, email, username, password, profile_image_url, age, phone_number } = req.body;

    User.findOne({
        where: {
            email: email
        }
    }).then(user => {
        if (user) {
            return res.status(400).send({
                message: 'Email already exist'
            })
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        User.create({
            full_name: full_name,
            email: email,
            username: username,
            password: hash,
            profile_image_url: profile_image_url,
            age: age,
            phone_number: phone_number,
        }).then(user => {
            const token = generateToken({
                id: user.id,
                full_name: user.full_name,
                email: user.email,
                username: user.username,
                profile_image_url: user.profile_image_url,
                age: user.age,
                phone_number: user.phone_number,
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
    const { full_name, email, username, password, profile_image_url, age, phone_number } = req.body;

    User.findOne({
        where: { id: req.params.userId },
    }).then(result => {
        if (result) {
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)

            User.update({
                full_name: full_name,
                email: email,
                username: username,
                password: hash,
                profile_image_url: profile_image_url,
                age: age,
                phone_number: phone_number,
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