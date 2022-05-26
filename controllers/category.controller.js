const Category = require('../models/index').Category;
const Product = require('../models/index').Product;

exports.addcategory = async (req, res, next) => {
    const { type } = req.body;
    console.log(`tyoe : ${type}`);

    Category.create({
        type: type,
        user_id: req.id
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

exports.getcategory = async (req, res, next) => {
    Category.findAll({
        include: [{
            model: Product,
            as: 'products',
            attributes: ['id', 'tittle', 'price', 'stock', 'category_id', 'createdAt', 'updatedAt']
        },
        ],
    }).then(result => {
        res.status(200).send({
            status: "SUCCESS",
            Photos: result
        })
    }).catch(error => {
        res.status(503).send({
            status: "FAILED",
            message: "failed load category"
        })
    })
}

exports.updatecategoryById = async (req, res, next) => {
    const { type } = req.body;
    category.findOne({
        where: {
            id: req.params.category_id
        }
    }).then(result => {
        if (req.id != result.userid) {
            return res.status(403).send({
                err: 'Forbidden'
            })
        }

        category.update({
            type: req.body,
        }, {
            where: {
                id: req.params.category_id
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
    })
}

exports.deletecategory = async (req, res, next) => {
    category.findOne({
        where: {
            id: req.params.categoryid
        }
    }).then(result => {
        if (req.id != result.user_id) {
            res.status(403).send({
                err: "Forbidden"
            })
        }

        category.destroy({
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
    })
}