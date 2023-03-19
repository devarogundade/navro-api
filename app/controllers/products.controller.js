const { product } = require("../models");
const db = require("../models");

const Product = db.product;

// Create and Save a new product
exports.create = (req, res) => {

    const product = {
        name: req.query.name,
        brand: req.query.brand,
        categories: req.query.categories.split(','),
        size: req.query.size,
        colors: req.query.colors.split(','),
        price: req.query.price,
        types: req.query.types.split(','),
        description: req.query.description,
        how_to_use: req.query.how_to_use.split(','),
        url: req.query.url,
        images: req.query.images.split(','),
        acne: req.query.acne,
        blackhead: req.query.blackhead,
        skinspot: req.query.skinspot,
    }

    console.log(product);

    Product.findOneAndUpdate(
        { name: product.name }, // filter
        { $set: product }, // data
        {
            upsert: true,
            returnNewDocument: true,
            returnDocument: "after"
        } // options
    ).then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some err occurred."
        })
    })

};

// Retrieve all Product from the database.
exports.findAll = (req, res) => {
    const colors = req.query.colors ? req.query.colors.split(',') : null
    const categories = req.query.categories ? req.query.categories.split(',') : null
    const types = req.query.types ? req.query.types.split(',') : null

    const query = {}

    if (colors) query.colors = { $in: colors }
    if (categories) query.categories = { $in: categories }
    if (types) query.types = { $in: types }

    Product.find(query)
        .then(data => {
            res.send({
                status: "Ok",
                data: data
            });
        })
        .catch(err => {
            res.status(500).send({
                status: "BAD",
                message: err.message || "Some err occurred."
            });
        });
};