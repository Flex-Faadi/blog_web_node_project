//====Here we make seperate functions of GET and POST data requets=====

const Blog = require("../models/blog");

//blog index-Page
const blog_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All Blogs ", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

//aprticular Blog detail Page
const blog_details = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("details", { title: "Details Page", blog: result });
    })
    .catch((err) => {
      res.status(404).render("404",{title:"Blog Not Found"})
    });
};

//Blog create page get request
const blog_create_get=(req,res)=>{
  res.render("create", { title: "Create a New Blog" });
}

//post data to database to create a new blog
const blog_create_post=(req,res)=>{
  const new_blog = new Blog(req.body);

  new_blog
    .save()
    .then((result) => {
      res.redirect('/blogs');
    })
    .catch((err) => {
      console.log("Err==>", err);
    });
}

//Delete a particular blog
const blog_delete=(req,res)=>{
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete
};
