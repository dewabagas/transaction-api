const Product = require('../models/index').Product;
const Category = require('../models/index').Category;
const { rupiahFormat } = require('../utils/textUtils');

exports.addProduct = async (req, res) => {
    const { title, price, stock, categoryid } = req.body;

    Category.findOne({
        where: { id: categoryid },
    }).then(value => {
        console.log('value', value)
        if (value) {
            Product.create({
                title: title,
                price: price,
                stock: stock,
                categoryid: categoryid,
            }).then(result => {
                res.status(201).send({
                    status: "SUCCESS",
                    message: "Product has been successfully created",
                    product: {
                        id: result.id,
                        title: result.title,
                        price: `Rp. ${rupiahFormat(result.price)}`,
                        stock: result.stock,
                        categoryid: result.categoryid,
                        updatedAt: result.updatedAt,
                        createdAt: result.createdAt
                    }
                })
            })
        } else {
            res.status(404).send({
                status: "FAILED",
                message: "Category Not Found"
            })
        }
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
        const newArray = result.map(obj => {
            return {
                id: obj.id,
                title: obj.title,
                price: `Rp. ${rupiahFormat(obj.price)}`,
                stock: obj.stock,
                categoryid: obj.categoryid,
                updatedAt: obj.updatedAt,
                createdAt: obj.createdAt
            }
        })
        res.status(200).send({
            status: "SUCCESS",
            products: newArray
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

    Product.findOne({
        where: {
            id: req.params.productid
        }
    }).then(result => {
        if (result) {
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
        } else {
            res.status(404).send({
                status: "FAILED",
                message: "Not Found"
            })
        }
    }).catch(error => {
        res.status(503).send({
            status: "FAILED",
            message: "failed update"
        })
    })
}

exports.editProductCategory = async (req, res) => {
    const { categoryid } = req.body;

    Product.findOne({
        where: {
            id: req.params.productid
        }
    }).then(result => {
        if (result) {
            Product.update({
                categoryid: categoryid
            }, {
                where: {
                    id: req.params.productid
                }
            }).then(value => {
                res.status(200).send({
                    status: "SUCCESS",
                    message: "Product Category has been successfully updated",
                    product: {
                        id: result.id,
                        title: result.title,
                        price: `Rp. ${rupiahFormat(result.price)}`,
                        stock: result.stock,
                        categoryid: result.categoryid,
                        updatedAt: result.updatedAt,
                        createdAt: result.createdAt
                    }
                })
            })
        } else {
            res.status(404).send({
                status: "FAILED",
                message: "Not Found"
            })
        }
    }).catch(error => {
        res.status(503).send({
            status: "FAILED",
            message: "failed update"
        })
    })
}

exports.deleteProduct = async (req, res) => {
    Product.findOne({
        where: {
            id: req.params.productid
        }
    }).then(result => {
        if (result) {
            Product.destroy({
                where: {
                    id: req.params.productid
                }
            }).then(result => {
                res.status(200).send({
                    status: "SUCCESS",
                    message: "Product has been successfully deleted"
                })
            })
        } else {
            res.status(404).send({
                status: "FAILED",
                message: "Not Found"
            })
        }
    }).catch(error => {
        res.status(503).send({
            status: "FAILED",
            message: "failed delete"
        })
    })
}