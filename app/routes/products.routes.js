module.exports = app => {
    const product = require("../controllers/products.controller.js")
    const router = require("express").Router()

    // Retrieve all products
    router.get("/", product.findAll)

    app.use("/products", router);
};