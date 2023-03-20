module.exports = app => {
    const product = require("../controllers/products.controller.js")
    const router = require("express").Router()

    // Retrieve all products
    router.get("/", product.findAll)

    // Retrieve a product
    router.get("/:id", product.findOne)

    // Insert products
    router.post("/", product.create)

    app.use("/products", router);
};