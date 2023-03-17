const db = require("../models");

const Product = db.product;

// Retrieve all Product from the database.
exports.findAll = (req, res) => {

    const colors = req.query.colors ? req.query.colors.split(',') : null
    const categories = req.query.categories ? req.query.categories.split(',') : null
    
    const query = {}

    if (colors) query.colors = { $in: colors }
    if (categories) query.categories = { $in: categories }

    Product.find(query)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some err occurred."
            });
        });
};