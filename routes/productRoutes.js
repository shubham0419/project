const express = require("express");
const router = express.Router();
const Product = require("../models/Product");


//  get all routes

router.get("/products",async (req, res) => {
    const products = await Product.find({});

    res.render("products/index",{products});
});

router.get("/products/new",(req, res)=> {
    res.render("products/new");
})

router.post("/products", async (req, res) => {
    const { name, img, price, desc } = req.body;
    await Product.create({ name, price, img, desc });
    res.redirect("/products")
});

router.get("/products/:productid", async (req, res) => {
    const { productid } = req.params;

    const product = await Product.findById(productid);
    res.render("products/show", { product });
});

router.get("/products/:productid/edit",async (req, res) => {
    const { productid } = req.params;
    const product = await Product.findById(productid);
    res.render("products/edit", { product });
})

router.patch("/products/:productid/", async (req, res) => {
    const { productid } = req.params;
    const { name, img, price, desc } = req.body;
    const product = await Product.findByIdAndUpdate(productid, { name, img, price, desc });
    res.redirect("/products");
})

router.delete("/products/:productid/", async (req, res)=> {
    const { productid } = req.params;
    await Product.findByIdAndDelete(productid);
    res.redirect("/products");
})

module.exports = router