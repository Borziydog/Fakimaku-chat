const express = require("express");
const app = express();
const config = require('./config.json');
const assert = require('assert');
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo');
const crypto = require('crypto');
var session = require('express-session');
var cookieParser = require('cookie-parser')
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
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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
    if(!req.body.name) return res.sendStatus(400);
    if(!req.body.pass) return res.sendStatus(400);
    const collection = db.collection('users');
    var name = req.body.name;
    if (!collection.findOne({"name": req.body.name})) { 
      collection.insertOne({"name": req.body.name,"password": crypto.createHash('md5').update(req.body.pass).digest('hex')}); 
      res.redirect("/login"); 
      } else {
      res.redirect("/reg");
    }
});
app.get('/login', function (req,res) {
  res.sendFile(__dirname + "/login.html");
});
app.post("/login",  function (req, res) { 
    if(!req.body.name) return res.sendStatus(400);
    if(!req.body.pass) return res.sendStatus(400);
    const collection = db.collection('users');
    let data = collection.findOne({"name": req.body.name,"password": crypto.createHash('md5').update(req.body.pass).digest('hex')}); 
    if (!data) { 
      res.redirect("/reg");
    } else {
      if(data.password !== crypto.createHash('md5').update(req.body.pass).digest('hex')) return res.redirect("/login");
      res.cookie('acc', req.body.name + "$" + crypto.createHash('md5').update(req.body.pass).digest('hex'), { maxAge: 900000, httpOnly: true });
      res.redirect("/app");
    }
});
app.get('/app', function (req, res) {
  var cookie = req.cookies.acc;
  if (cookie === undefined) {
    res.redirect("/reg")
  } else {
    const collection = db.collection('users');
    let data = collection.findOne({"name": cookie.split("$")[0],"password": cookie.split("$")[1]}); 
    if (!data) {
      res.render("Messenger");
    } else {
      res.redirect("/reg")
    }
  }
}); 


app.use(function(req, res, next) {
  res.status(404).sendFile(__dirname + "/404.html")
});
app.get('/logout', function(req, res, next) {
 if (req.session.user) {
 delete req.session.user;
 res.redirect('/')
}});

const listener = app.listen(80, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
