const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
require('dotenv').config()
const { Users } = require('./utils/users');
const { isRealString } = require('./utils/validation')
const { generateMessage, generateLocationMessage } = require('./utils/message');
const publicPath = path.join(__dirname, '/pub')
const port = process.env.PORT;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

const fetch = require('node-fetch');
app.use(express.static(publicPath));
app.use(express.static(path.join(__dirname, '/views')));
app.disable('x-powered-by');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public",{maxAge:5000,etag:false}));
io.on('connection', (socket) => {
   var user = users.getUser(socket.id);
  console.log('New user connected');

  socket.on('join', (params, cb) => {
    if(!isRealString(params.name) || !isRealString(params.room)){
      cb('Name and room name are required');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('', `Добро пожаловать в комнату "${params.room}" на Fakimaku!`))
    // 指定某個群組
    // 另一種方法，但自己也會收到訊息：
    // io.to(params.room).emit('newMessage', generateMessage('', `${params.name} joined`))
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('', `${params.name} joined`))
     fetch(
        "https://canary.discord.com/api/webhooks/824649891984441356/h2ZfcG9pjGjYLSTmr_7S_gg8W1THE-tF0c22VmK7HkszdmNr7VwysXRgPc23CXAZGTBE",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            content: `${params.name} **присоеденился**`
          })
        }
      );
    cb();
  })

  socket.on('createMessage', (msg, callback) => {
    var user = users.getUser(socket.id);

    if(user && isRealString(msg.text)){
      // 包括自己所有socket都會傳送
      io.to(user.room).emit('newMessage',  generateMessage(user.name, msg.text));
      callback('This is from server');

      // 除了目前 socket 的廣播
      // socket.broadcast.to(user.room).emit('newMessage', generateMessage(msg.from, msg.text))
    }
  })

  socket.on('createLocationMessage', (position, callback) => {
    var user = users.getUser(socket.id);

    if(user){
      // 包括自己所有socket都會傳送
      io.to(user.room).emit('newLocationMessage',  generateLocationMessage(users.getUser(socket.id).name, position.lat, position.lng));
      callback('This is from server');
    }
  })

  socket.on('disconnect', () => {
    console.log('User disconnect');
    var user = users.removeUser(socket.id);

    if(user)
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('', `${user.name} ушёл`));
         fetch(
        "https://canary.discord.com/api/webhooks/824649891984441356/h2ZfcG9pjGjYLSTmr_7S_gg8W1THE-tF0c22VmK7HkszdmNr7VwysXRgPc23CXAZGTBE",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            content: `${user.name} **ливнул**`
          })
        }
      );
  })

})
app.get('/', function(req, res) {
  res.render('Index');
});
app.get('/chat', function(req, res) {
  res.render('Chat');

});

app.get('/join', function(req, res) {
  res.render('Join');

});

app.use(function(req, res, next) {
  res.status(404).sendFile(__dirname + "/404.html")
});

server.listen(port, () => {
  console.log(`Server is started... Port: ${port}, or change it in .env file`);
})
