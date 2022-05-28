const Category = require('../models/index').Category;
const Product = require('../models/index').Product;

exports.addCategory = async (req, res, next) => {
    const { type } = req.body;

    Category.create({
        type: type,
        user_id: req.user.id
    }).then(result => {
        res.status(201).send({
            status: "SUCCESS",
            message: "Category has been successfully created",
            category: result
        })
    }).catch(error => {
        res.status(503).send({
            status: "FAILED",
            message: "failed create"
        })
    })
}

exports.getCategory = async (req, res, next) => {
    Category.findAll({
        include: [{
            model: Product,
            as: 'products',
        },
        ],
    }).then(result => {
        res.status(200).send({
            status: "SUCCESS",
            Categories: result
        })
    }).catch(error => {
        res.status(503).send({
            status: "FAILED",
            message: "failed load category"
        })
    })
}

exports.updateCategoryById = async (req, res, next) => {
    const { type } = req.body;
    Category.findOne({
        where: {
            id: req.params.categoryid
        }
    }).then(result => {
        if (result) {
            Category.update({
                type: type,
            }, {
                where: {
                    id: req.params.categoryid
                }
            }).then(result => {
                res.status(200).send({
                    status: "SUCCESS",
                    message: "Category has been successfully updated",
                    category: result
                })
            }).catch(error => {
                res.status(503).send({
                    status: "FAILED",
                    message: "failed update"
                })
            })
        } else {
            res.status(404).send({
                status: "FAILED",
                message: "Not Found"
            })
        }
    })
}

exports.deleteCategory = async (req, res, next) => {
    Category.findOne({
        where: {
            id: req.params.categoryid
        }
    }).then(result => {
        if (result) {
            Category.destroy({
                where: {
                    id: req.params.categoryid
                }
            }).then(result => {
                res.status(200).send({
                    status: "SUCCESS",
                    message: "Category has been successfully deleted"
                })
            }).catch(error => {
                res.status(503).send({
                    status: "FAILED",
                    message: "failed delete"
                })
            })
        } else {
            res.status(404).send({
                status: "FAILED",
                message: "Not Found"
            })
        }
    })
}