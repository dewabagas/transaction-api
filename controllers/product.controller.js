const Product = require('../models/index').Product;
const User = require('../models/index').User;


exports.addProduct = async (req, res) => {
    const { title, price, stock, categoryid } = req.body;

    Product.create({
        title: title,
        price: price,
        stock: stock,
        categoryid: categoryid,
    }).then(result => {
        res.status(201).send({
            status: "SUCCESS",
            message: "Product has been successfully created",
            product: result
        })
    }).catch(error => {
        res.status(503).send({
            status: "FAILED",
            message: "failed create"
        })
    })
}

exports.getProduct = async (req, res) => {
    Product.findAll({
    }).then(result => {
        res.status(200).send({
            status: "SUCCESS",
            Products: result
        })
    }).catch(error => {
        res.status(503).send({
            status: "FAILED",
            message: "failed load product"
        })
    })
}

exports.editProduct = async (req, res) => {
    const { title, price, stock } = req.body;
    console.log(`params : ${req.params}`)

    Product.findOne({
        where: {
            id: req.params.productid
        }
    }).then(result => {
        if(!result) {
            res.status(404).send({
                status: "FAILED",
                message: "Product not found"
            })
        }
        Product.update({
            title: title,
            price: price,
            stock: stock
        }, {
            where: {
                id: req.params.productid
            }
        }).then(result => {
            res.status(200).send({
                status: "SUCCESS",
                message: "Product has been successfully updated",
                Products: result
            })
        })
    }).catch(error => {
        res.status(503).send({
            status: "FAILED",
            message: "failed update"
        })
    })
}

exports.editProductCategory = async (req, res) => {
    const { category_id } = req.body;

    Products.findOne({
        where: {
            id: req.params.product_id
        }
    }).then(result => {
        if (req.id != result.userid) {
            return res.status(403).send({
                err: 'Forbidden'
            })
        }

        Products.update({
            category_id: category_id
        }, {
            where: {
                id: req.params.product_id
            }
        }).then(result => {
            res.status(200).send({
                status: "SUCCESS",
                message: "Product has been successfully updated",
                Products: result
            })

        }).catch(error => {
            res.status(503).send({
                status: "FAILED",
                message: "failed update"
            })
        })
    })
}

exports.deleteProduct = async (req, res) => {
    Products.findOne({
        where: {
            id: req.params.productid
        }
    }).then(result => {
        if (req.id != result.user_id) {
            res.status(403).send({
                err: "Forbidden"
            })
        }

        Products.destroy({
            where: {
                id: req.params.productid
            }
        }).then(result => {
            res.status(200).send({
                status: "SUCCESS",
                message: "Product has been successfully deleted"
            })
        }).catch(error => {
            res.status(503).send({
                status: "FAILED",
                message: "failed delete"
            })
        })
    })
}