//=================EXPRESS JS APP===============
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
const path = require('path')


//Register View Engine
app.set("view engine", "ejs");

//CONNECT TO MONGO DATA-BASE
const dbURI =
  "mongodb+srv://admin:admin@cluster0.ayrpl.mongodb.net/BlogWebsiteData?retryWrites=true&w=majority";

mongoose
  .connect(dbURI)
  .then((result) => app.listen(3002))
  .catch((err) => console.log("err=>", err));

//===3rd-party MIDDLEWARE===
const morgan = require("morgan");
app.use(morgan("dev"));

//=======Static Files=========
app.use(express.static("public"));

//Middleware for post request
app.use(express.urlencoded({ extended: true }));

//routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

//about route
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//Blog Routes
app.use("/blogs", blogRoutes);

//ERROR PAGE
app.use((req, res) => {
  res.status(404).render("404", { title: "404 page" });
});


