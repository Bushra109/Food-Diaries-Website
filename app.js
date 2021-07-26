
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const homeStartingContent ="Hello,Food is the third most important thing for living beings to provide energy and development, maintain life, or stimulate growth after air and water. In fact, it is one of the most complicated sets of chemicals.Food plays an important role in the promotion of health and disease prevention. In general, it consists of essential nutrients, such as carbohydrates, proteins, fats, minerals and vitamins which are consumed to provide nutritional support for an organism and ingested by an organism and assimilated by the organism's cells to sustain health. These nutritious foods are in the form of grains, pulses, fruits, vegetables, oils, etc. ";



const aboutContent = "Hello.I am Bushra Shireen,a food lover.I love to explore various dishes ranging from countries to countries trying out various national and international dishes.I have got experience in the field of food blogging for 6 long years and now I want to share through this website.My love for food and travelling is something I want to express through this blogs.This will not only enrich the knowledge of my audience but also make them fall in love with food and travelling!!!";


const contactContent = "Thank You fo visiting our page!!!Connecting with others gives us a sense of inclusion, connection, interaction, safety, and community. Your vibe attracts your tribe, so if you want to attract positive and healthy relationships, be one! Staying connected and getting reconnected feeds the flow of goodness which empowers our humanity...Hope you liked it.It would be amazing to meet you and have you as the part of our food diaries family.Because we believe in growing together where everyone is important.Please contact us in the provided details";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://Bushra01:Bushra01@cluster0.cyvzm.mongodb.net/blogsDB", {useNewUrlParser: true});

const postSchema = {

 title: String,

 content: String

};
const Post = mongoose.model("Post", postSchema);




app.get("/", function(req, res) {
Post.find({}, function(err, posts){
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
  });
  });
})


app.get("/about", function(req, res) {
  res.render("about", {
    AboutContent: aboutContent
  });
})

app.get("/contact", function(req, res) {
  res.render("contact", {
    ContactContent: contactContent
  });
})

app.get("/compose", function(req, res) {
  res.render("compose");
})

app.post("/compose", function(req, res) {
  const post = new Post ({

    title: req.body.postTitle,

    content: req.body.postBody

  });

  post.save(function(err){

    if (!err){

      res.redirect("/");

    }

  });

});

app.get("/posts/:postId", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);
const requestedPostId = req.params.postId;
Post.findOne({_id: requestedPostId}, function(err, post){

   res.render("post", {

     title: post.title,

     content: post.content

   });

 });
})



let port = process.env.PORT;
if (port == NULL || port == "") {
  port = 3000;
}


app.listen(port, function() {
  console.log("Server has started successfully.");
});
