const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const PORT = 8080;
const cookieParser = require("cookie-parser");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
const generateRandomString = () => {
  let result           = '';
  let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

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
  const templateVars = {
    username: req.cookies["username"],
    urls: urlDatabase 
    // ... any other vars
  };
  
  res.render("urls_index", templateVars);
});
//response for /hello
app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});
//error handler
app.use(function(req, res, next){
  res.status(404);
  res.send("404 Error!");
});
//response for /urls/new
app.get("/urls/new", (req, res) => {
  const templateVars = {
    username: req.cookies["username"],
    // ... any other vars
  };
  res.render("urls_new", templateVars);
});
//response for /urls/:shortURL
app.get("/urls/:shortURL", (req, res) => {
  //console.log(urlDatabase);
  const templateVars = {
    username: req.cookies["username"],
    shortURL: req.params.shortURL, 
    longURL: urlDatabase[req.params.shortURL]
    // ... any other vars
  };
  res.render("urls_show", templateVars);
});
app.get("/u/:shortURL", (req, res) => {
  let shortURL = req.params.shortURL;
  const longURL = urlDatabase[shortURL];
  res.redirect(longURL);
});
//response for /register
app.get("/form", (req, res) => {
  const templateVars = {
    username: req.cookies["username"],
    // ... any other vars
  };
  res.render('form', templateVars);
});
app.post("/urls", (req, res) => {
  //console.log(req.body);  // Log the POST request body to the console
  let shortURL = generateRandomString();
  urlDatabase[shortURL] = req.body.longURL;
  res.redirect('/urls/' + shortURL);
});
//post request to delete
app.post('/urls/:shortURL/delete', (req, res) => {
  console.log("DELETE ROUTE HAS BEEN HIT");
  delete urlDatabase[req.params.shortURL];
  res.redirect('/urls');
});
//post request to edit
app.post('/urls/:shortURL/edit', (req, res) => {
  const shortURL = req.params.shortURL;
  res.redirect('/urls/' + shortURL);
});
app.post('/urls/:shortURL/replaceURL', (req, res) => {
  console.log("Edit ROUTE HAS BEEN HIT");
  const longURL = req.body.urlBox;
  const shortURL = req.params.shortURL;  
  urlDatabase[shortURL] = longURL;
  res.redirect('/urls');
});
app.post('/login', (req, res) => {
  res.cookie('username', req.body.username);
  res.redirect('/urls');
}); 
app.post('/logout', (req, res) => {
  res.clearCookie('username');
  res.redirect('/urls');
});
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
