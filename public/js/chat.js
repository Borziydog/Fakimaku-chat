var socket = io();
socket.on('connect', function () {
  var params = getParams();

  socket.emit('join', params, function (err) {
    if (err) {
      alert(err);
      window.location.href = '/';
    } else {
      console.log('all OK! no error')
    }
  })
})

if (!navigator.onLine) {
  $('#offline').append('<h1>Internet connection limited or not available.<br>Fakimaku does\'nt work withnout Internet connection.</h1>')
}

function getParams() {
  var paramsTxt = decodeURI(window.location.search.slice(1));
  var paramsObj = {};
  paramsTxt.split('&').forEach((item) => {
    var key = item.split('=')[0];
    var val = item.split('=')[1];
    paramsObj[key] = val;
  })

  return paramsObj;
}

function scrollToBottom() {
  var messages = $("#messages");

  var msgBoxScrollTop = messages.scrollTop();
  var newMsgOffsetTop = $("#messages .message:last-child").offset().top;
  var newMsgHeight = $("#messages .message:last-child").height();

  $("#messages").scrollTop(msgBoxScrollTop + newMsgOffsetTop + newMsgHeight);
}

socket.on('updateUserList', function (users) {
  console.log(users);
 
  var el = document.getElementById('Kakahi');
  el.remove();
  $("#users").append(users);
  
})

socket.on('newMessage', function (msg) {
  var template = $("#message-template").html();
  var time = moment(msg.createAt).format('h:mm a');
  var html = Mustache.render(template, {
    time,
    from: msg.from,
    text: msg.text
  })

  $("#messages").append(html);
  scrollToBottom();
})

socket.on('newLocationMessage', function (msg) {
  var template = $("#location-message-template").html();
  var time = moment(msg.createAt).format('h:mm a');
  var html = Mustache.render(template, {
    time,
    from: msg.from,
    url: msg.url
  })

  $("#messages").append(html);
  scrollToBottom();
})

$("#message-form").on("submit", function (e) {
  e.preventDefault();

  var messageBox = $('input[name=message]');

  socket.emit('createMessage', {
    text: messageBox.val()
  }, function () {
    messageBox.val('');
  })
})

var locationBtn = $("#sendGeolacation");
locationBtn.on("click", function () {
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported by your your browser.');
  }

  locationBtn.prop('disabled', true).text('Sending location...');
  navigator.geolocation.getCurrentPosition(function (position) {
    locationBtn.prop('disabled', false).text('Send location');
    socket.emit('createLocationMessage', {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }, function () {

    })
  }, function () {
    locationBtn.prop('disabled', false).text('Send location');
    alert('Unable to fetch location.')
  })
})
