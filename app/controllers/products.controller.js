const { product } = require("../models");
const db = require("../models");

const Product = db.product;

// Create and Save a new product
exports.create = (req, res) => {

    const product = {
        name: req.query.name,
        brand: req.query.brand,
        categories: req.query.categories.split(',').map(category => category.trim()),
        size: req.query.size,
        colors: req.query.colors.split(',').map(color => color.trim()),
        price: req.query.price,
        types: req.query.types.split(',').map(type => type.trim()),
        description: req.query.description,
        how_to_use: req.query.how_to_use.split(',').map(htu => htu.trim()),
        url: req.query.url,
        images: req.query.images.split(',').map(image => image.trim()),
        acne: req.query.acne,
        blackhead: req.query.blackhead,
        skinspot: req.query.skinspot,
    }

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
    const acne = (req.query.acne && req.query.acne == 'true')
    const skinspot = (req.query.skinspot && req.query.skinspot == 'true') 
    const blackhead = (req.query.blackhead && req.query.blackhead == 'true') 

    const query = {}

    if (colors) query.colors = { $in: colors }
    if (categories) query.categories = { $in: categories }
    if (types) query.types = { $in: types }

    query.$or = [{ acne: acne }, { skinspot: skinspot }, { blackhead: blackhead }]

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
}

// Find a single product with an id
exports.findOne = (req, res) => {
    let id = req.params.id
    Product.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found with id " + id });
            else res.send({
                status: "Ok",
                data: data
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving with id=" + id
            });
        });
};