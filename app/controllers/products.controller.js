const db = require("../models");

const Product = db.product;

// Retrieve all Product from the database.
exports.findAll = (req, res) => {
    Product.find(req.query)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some err occurred."
            });
        });
};