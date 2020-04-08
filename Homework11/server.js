// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;
var notePath = path.join(__dirname,"/db/db.json");
var notes = []

fs.readFile(notePath,'utf8',(err,data)=>{
  if(err) throw err;
  console.log(data);
  notes.push(data);
})

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/assets/css/styles.css", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/assets/css/styles.css"));
});

app.get("/assets/js/index.js", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/assets/js/index.js"));
});

app.get("/api/notes", function(req, res) {
  return res.json(notePath);
});

app.post("/api/notes", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newnote = req.body;

  // Using a RegEx Pattern to remove spaces from reservation
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html

  console.log(newnote);
  console.log(notes);
  notes.push(newnote);
  
  res.json(notes);
  fs.writeFile(notePath,notes,(err)=>console.log(err));
});

app.delete("/api/notePath", function(req, res) {
 

  res.json(notePath);
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});