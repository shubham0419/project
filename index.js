const express = require("express");
const app = express();
const path = require("path");
const colors = require("colors")
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");

mongoose.connect("mongodb://127.0.0.1:27017/ecommersdb")
.then(console.log("db connected".blue))
.catch((err) => console.log(err));

// Routes
const productRoutes = require("./routes/productRoutes");

app.engine("ejs",ejsMate)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
// app.use(express.static(path.join(__dirname, "public")));

app.use(productRoutes);




app.listen("3000", () => {
    console.log("server conected".blue);
})