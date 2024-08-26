const express = require("express");
const app =  express();
const path = require("path");
const port = 3000;

app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");

app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

const { v4: uuidv4 } = require('uuid');

var methodOverride = require('method-override')
 
app.use(methodOverride('_method'));

let posts = [

    {  
        id: uuidv4(),
        username: "Ankit Singh",
        content: "First Post ",

    },

    {  
        id: uuidv4(),
        username: "Adam",
        content: " Second Post ",

    },

    {  
        id: uuidv4(),
        username: " Evans ",
        content:  " Third Post ",

    }
]

app.get("/post", (req, res) => {
    res.render("home.ejs", {posts});
})

app.get("/post/new", (req, res) => {
    res.render("new.ejs");
})

app.post("/post", (req, res) => {
   let {username, content} = req.body;
   let id = uuidv4();
   posts.push({id, username, content});
   console.log(posts);
   res.redirect("/post");
})

app.patch("/post/:id", (req, res) => {
    let {id} = req.params;
    let newContent = req.body.content;
    console.log(req.body.content);
    let post = posts.find((p) => id.trim() === p.id );
    console.log(post);
    post.content = newContent;
    res.redirect("/post");
})

app.get("/post/:id", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => p.id === id);
    res.render("show.ejs",{post});
})


app.get("/post/:id/edit", (req,res) => {
   let {id} = req.params;
   let post = posts.find((p) => p.id === id.trim() );
   res.render("edit.ejs", {post});
})

app.delete("/post/:id", (req,res) => {
    let {id} = req.params;
    console.log(id)
    posts = posts.filter((p) => id !== p.id);
    console.log(posts);
    res.redirect("/post");
})

app.listen(port, () => {
    console.log(`app is listening on ${port}`);

})