const Product = require("../models/index").Product;
const TransactionHistory = require("../models/index").TransactionHistory;
const Category = require('../models/index').Category
const User = require('../models/index').User

exports.addTransaction = async (req, res) => {
    const { productid, quantity } = req.body;

    Product.findOne({
        where: { id: productid }
    }).then(value => {
        console.log('value product', value.categoryid);
        const totalPrice = quantity * value.price
        if (value) {
            if (value.stock < quantity) {
                res.status(400).send({
                    status: "FAILED",
                    message: "Not enough stock"
                })
            } else if (req.user.balance < totalPrice) {
                res.status(400).send({
                    status: "FAILED",
                    message: "Not enough balance"
                })
            } else {
                TransactionHistory.create({
                    productid: productid,
                    userid: req.user.id,
                    quantity: quantity,
                    total_price: totalPrice
                }).then(result => {
                    User.update({
                        balance: req.user.balance - totalPrice
                    }, {
                        where: { id: req.user.id }
                    })

                    Product.update({
                        stock: value.stock - quantity
                    }, { where: { id: productid } })

                    Category.update({
                        sold_product_amount: quantity
                    }, { where: { id: value.categoryid } })

                    res.status(201).send({
                        status: "SUCCESS",
                        message: "Transaction History has been successfully created",
                        data: {
                            id: result.id,
                            productid: result.productid,
                            product_name: value.title,
                            quantity: result.quantity,
                            total_price: `Rp. ${result.total_price}`
                        }
                    })
                })
            }

        } else {
            res.status(404).send({
                status: "FAILED",
                message: "Product Not Found"
            })
        }
    }).catch(err => {
        res.status(503).send({
            status: "FAILED",
            message: "failed create"
        })
    })

}

exports.getTransactionsUser = async (req, res) => {
    TransactionHistory.findAll({
        include: [
            {
                model: Product,
                as: 'product',
            },
            {
                model: User,
                as: 'user',
            },
        ],
        where: { userid: req.user.id }
    }).then(result => {
        res.status(200).send({
            status: "SUCCESS",
            transactionHistories: result,
        })
    })
}

exports.getTransactionsAdmin = async (req, res) => {
    TransactionHistory.findAll({
        include: [
            {
                model: Product,
                as: 'product',
            },
            {
                model: User,
                as: 'user',
            },
        ],
    }).then(result => {
        res.status(200).send({
            status: "SUCCESS",
            transactionHistories: result,
        })
    })
}

exports.getTransaction = async (req, res) => {
    TransactionHistory.findOne({
        include: {
            model: Product,
            as: 'product'
        },
        where: {id : req.params.transactionid }
    }).then(result => {
        if(result) {
            res.status(200).send({
                status: "SUCCESS",
                transaction: result,
            })
        } else {
            res.status(404).send({
                status: "FAILED",
                message: "Not Found"
            })
        }
    }).catch(err => {
        res.status(503).send({
            status: "FAILED",
            message: "Failed load transaction"
        })
    })

}