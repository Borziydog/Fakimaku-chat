const express = require("express");
const app = express();
const config = require('./config.json');
const assert = require('assert');
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo');
var session = require('express-session');
var db;
var MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(config.mongo_linc,  { useNewUrlParser: true, useUnifiedTopology: true } );
const dbName = "Fakimaku"
app.disable('x-powered-by');
client.connect(function(err) {
  assert.equal(null, err);
  console.log('Connected successfully to server');
  db = client.db(dbName);
});
app.set('view engine', 'ejs');
app.use(express.static("pub"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.cookieDecoder());
app.use(session({
  secret: '202103',
  resave: false,
  saveUninitialized: true,
}))
/* 
const fetch = require('node-fetch');
setInterval(() => fetch('https://fakimaku.glitch.me'), 5000);
*/
app.get('/', function(req, res, next){
  res.sendFile(__dirname + "/index.html");
});
app.get('/reg', function(req, res, next) {
      res.sendFile(__dirname + "/register.html");
      
});
app.post("/reg",  function (req, res) { 
    if(!req) return res.sendStatus(400);
    const collection = db.collection('users');
    collection.insertOne({"name": req.body.name,"password": req.body.pass}); 
    res.redirect("/");
});
app.get('/login', function (req,res) {
  res.sendFile(__dirname + "/login.html");
});
app.post("/login",  function (req, res) { 
    if(!req) return res.sendStatus(400);
    const collection = db.collection('users');
    let data = collection.findOne({"name": req.body.name,"password": req.body.pass}); 
    if (!data) res.redirect("/reg");
        
    req.session.user = data
    res.redirect("/");
});
app.get('/app', function (req, res) {
  res.render("Messenger");
}); 


app.use(function(req, res, next) {
  res.status(404).sendFile(__dirname + "/404.html")
});
app.get('/logout', function(req, res, next) {
 if (req.session.user) {
 delete req.session.user;
 res.redirect('/')
}});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});