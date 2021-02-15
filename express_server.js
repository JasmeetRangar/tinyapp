const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const PORT = 8080;
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
function generateRandomString() {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < 6; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};
//response for homepage
app.get("/", (req, res) => {
  res.send("Hello!");
});
//response for /urls.json
app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});
//response for /urls
app.get("/urls", (req, res) => {
  const templateVars =  { urls: urlDatabase };
  res.render("urls_index", templateVars);
});
//response for /hello
app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});
//response for /urls/new
app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});
//response for /urls/:shortURL
app.get("/urls/:shortURL", (req, res) => {
  const templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL] };
  res.render("urls_show", templateVars);
});
app.post("/urls", (req, res) => {
  console.log(req.body);  // Log the POST request body to the console
  urlDatabase[req.body] = generateRandomString();
  console.log(urlDatabase[req.body]);
});
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
