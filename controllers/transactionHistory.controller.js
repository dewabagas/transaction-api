const bcrypt = require('bcrypt');
const db = require("../config/db");
const TransactionHistory = require("../models/index").TransactionHistory;
const { generateToken } = require("../middlewares/auth");

exports.addTransaction = async (req, res) => {
    const {productid, userid, quantity, total_price} = req.body;

    TransactionHistory.create({
        productid: productid,
        userid: userid,
        quantity: quantity,
        total_price: total_price
    }).then(result => {
        res.status(201).send({
            status: "SUCCESS",
            message: "Transaction History has been successfully created",
            data: result
        })
    }).catch(error => {
        res.status(503).send({
            status: "FAILED",
            message: "failed create"
        })
    })
}

exports.getTransactionUser = async (req, res) => {
    TransactionHistory.findAll({
        where: {userid: req.id}
    }).then(result => {
        res.status(200).send({
            status: "SUCCESS",
            tra: result
        })
    })
}