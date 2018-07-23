// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/mongoScraper");

// Routes

app.get("/scrape", function(req, res) {
  axios.get("https://www.nhl.com/").then(function(response) {
    var $ = cheerio.load(response.data);

    $("h4.headline-link").each(function(i, element) {
      var result = {};

      result.title = $(this).text();
      result.link = $(this).parent().attr("href");
      result.saved = false;

      db.Article.create(result)
        .then(function(dbArticle) {
        })
        .catch(function(err) {
          return res.json(err);
        });
    });
    res.send("Scrape Complete");
  });
});

app.get("/articles", function(req, res) {
  db.Article.find({})
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.get("/articlessaved", function(req, res) {
  db.Article.find({"saved": "true"})
  .then(function(dbArticle) {
    res.json(dbArticle);
  }).catch(function(err) {
    res.json(err);
  })
})

app.get("/articles/:id", function(req, res) {
  db.Article.findOne({ _id: req.params.id })
    .populate("note")
    .then(function(dbArticle) {
      res.json(dbArticle);
      console.log("Saved Article: " + dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.get("/save/:id", function(req, res) {
  console.log("saved id " + req.params.id);
  var objectId = 'ObjectId("' + req.params.id + '")'
  console.log(objectId);
  db.Article.update({"_id": objectId }, {$set: {"saved": true}})
    .then(function(dbArticle) {
      res.json(dbArticle);
      console.log("Saved Article: " + dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    })
})

app.get("/remove", function(req, res) {
  console.log(req.params.id);
  db.Article.update({"_id": req.params.id }, {$set: {"saved":"false"}})
    .then(function(dbArticle) {
      res.json(dbArticle);
      console.log("Removed Article: " + dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    })
})

// Start the server
app.listen(PORT, function() {
  console.log("Listening on Port " + PORT + ".");
});
