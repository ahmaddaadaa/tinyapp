const express = require("express");
const morgan = require('morgan');
const app = express();
const PORT = 8080; // default port 8080

const generateRandomString = function() {
  return Math.random().toString(36).substring(2,8);
};

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs"); // set us a view engine for our EJS files 




const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};



app.get("/urls", (req, res) => {
  const templateVars = {urls: urlDatabase};
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

app.get("/urls/:id", (req, res) => {
  const templateVars = { id: req.params.id, longURL: urlDatabase[req.params.id] };
  res.render("urls_show", templateVars);
});


app.get("/u/:id", (req, res) => {
  const longURL = urlDatabase[req.params.id];
  res.redirect(longURL);
});


app.post("/urls", (req, res) => {
  const generatedKey = generateRandomString();
  urlDatabase[generatedKey] = req.body.longURL;
  const templateVars = { id: generatedKey, longURL: req.body.longURL};
  res.render("urls_show", templateVars);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});