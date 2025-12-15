// Import express and create an app instance
const express = require("express");
const app = express();

// Port where the server will listen
const port = 3000;

// Node's utility for working with file paths
const path = require("path");

// UUID generator for creating simple unique IDs for posts
const { v4 : uuidv4 } = require("uuid");

// method-override lets us use HTTP verbs like PATCH and DELETE
// in places (like plain HTML forms) that only support GET and POST
const methodOverride = require('method-override');


// Tell express to look for a query parameter named `_method`
// (for example: ?_method=PATCH) and treat the request as that HTTP method
app.use(methodOverride('_method'));

// Parse URL-encoded form data (from HTML forms) into req.body
app.use(express.urlencoded({extended : true}));


// Set EJS as the template engine and where views are located
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

// Serve static files like CSS from the `public` directory
app.use(express.static(path.join(__dirname,"public")));




// resource -> posts
// In-memory array of posts for this example app.
// In a production app you would store posts in a database instead.
let posts = [
  {
    id : uuidv4(),
    username : "devendra",
    content : "I love formula1!"
  },
  {
    id : uuidv4(),
    username : "nishit",
    content : "I love my India"
  },
  {
    id : uuidv4(),
    username : "srikar",
    content : "erripuka"
  }
];


// INDEX route - show all posts
app.get("/posts",(req,res) => {
  // Render `views/index.ejs` and pass `posts` so the template can use it
  res.render("index.ejs",{posts});
});

// NEW route - form to create a new post
app.get("/posts/new",(req,res) => {
  res.render("new.ejs");
});

// CREATE route - receive form data and add a new post
app.post("/posts",(req,res) => {
  let id = uuidv4();
  // `req.body` is populated because of `express.urlencoded()` middleware
  let {username,content} = req.body;
  posts.push({id,username,content});
  // After creating, redirect back to the list of posts
  res.redirect("/posts");
});

// SHOW route - show a single post in detail
app.get("/posts/:id",(req,res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("showpost.ejs",{ post });
});

// UPDATE route - update the content of an existing post
app.patch("/posts/:id",(req,res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => id === p.id);
  post.content = newContent;
  res.redirect("/posts");
});

// EDIT route - form to edit an existing post
app.get("/posts/:id/edit",(req,res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs",{ post });
});

// DELETE route - delete a post by id
app.delete("/posts/:id",(req,res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id);
  res.redirect("/posts");
})

// Start the server and listen on the given port
app.listen(port,() => {
  console.log(`listening at port : ${port}`);
});

