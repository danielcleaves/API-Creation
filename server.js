// Require the Express Module
var express = require("express");
// Create an Express App
var app = express();
// Require body-parser (to recieve post data from clients)
var bodyParser = require("body-parser");
// Integrate body-parser with our App
var path = require('path');

app.use(express.static(path.join(__dirname, "./static")));

app.use(bodyParser.json());
// Setting our Static Folder Directory

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/api');

var peopleSchema = new mongoose.Schema({
 name: String,
})

mongoose.model('people', peopleSchema); // We are setting this Schema in our Models as 'User'
var people = mongoose.model('people'); // We are retrieving this Schema from our Models, named 'User'

app.get('/',function(req,res) {
 people.find({}, function(err, result){
 	res.json(result);
 })
})

 app.get('/new/:name/',function(req,res) {
 	var add = new people({name: req.params.name })
 	add.save(function(err,result) {
 	res.json(result);
 	})
 });

 app.get('/remove/:name/',function(req,res) {
  people.remove({name: req.params.name}, function(err,result) {
  res.json(result);
	});
 });

  app.get('/:name',function(req,res) {
  people.findOne({name: req.params.name}, function(err,result){
  	res.json(result);
  })
 });



// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})


