// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");

// Express App
// =============================================================
var app = express();
var PORT = 3000;
var notePath = path.join(__dirname,"/db/db.json");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});


app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});


app.get("/api/notes", async function(req, res) {
  const data = await fs.readFileSync(notePath, 'utf8')
  const notes = await JSON.parse(data)
  return res.json(notes);
});


app.post("/api/notes", async function(req, res) {
  const data = await fs.readFileSync(notePath, 'utf8')
  const notes = await JSON.parse(data)

  var newnote = req.body;

  console.log(newnote);
  console.log(notes);
  newnote.id = notes.length + 1;

  await notes.push(newnote);
  
  const noteString = await JSON.stringify(notes)

  await fs.writeFile(notePath,noteString,(err)=> {if (err) throw err});
  res.json(notes)
});


app.delete("/api/notes/:id", async function(req, res) {
 const { id } = req.params;

 const data = await fs.readFileSync(notePath, 'utf8')
 const notes = await JSON.parse(data)

  await notes.forEach((el, i, object) => {
    if (el.id === parseInt(id)) {
      object.splice(i, 1)
    }
  });

  const noteString = await JSON.stringify(notes)

  await fs.writeFile(notePath,noteString,(err)=> {if (err) throw err});
  res.json(notes)
});


app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});