const express = require("express");
const app = express();
const config = require('./config.json');
const assert = require('assert');
var bodyParser = require('body-parser')
var db;
var MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(config.mongo_linc,  { useNewUrlParser: true, useUnifiedTopology: true } );
                                                                        
// Use connect method to connect to the server
const dbName = "Fakimaku"
client.connect(function(err) {
  assert.equal(null, err);
  console.log('Connected successfully to server');

  db = client.db(dbName);


});
app.use(express.static("pub"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
//app.use(express.cookieDecoder());
//app.use(express.session());
// const fetch = require('node-fetch');
// setInterval(() => fetch('https://fakimaku.glitch.me'), 5000);
app.disable('x-powered-by');
app.get('/', function(req, res, next){
  res.sendFile(__dirname + "/index.html");
});
app.get('/reg', function(req, res, next) {
      res.sendFile(__dirname + "/register.html")
      
});
app.post("/reg",  function (req, res) { 
    if(!req) return res.sendStatus(400);
    const collection = db.collection('users');
    collection.insertOne({"name": req.body.name,"password": req.body.pass}); 
    res.redirect("/")
});

app.use(function(req, res, next) {
  res.status(404).sendFile(__dirname + "/404.html")
});
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});