var socket;
var input = document.getElementById("msgbox")
input.disabled = true;
var btn = document.getElementsByClassName("send").item(0);
btn.disabled = true;
function connect() {
  if (socket && socket.readyState == 1)
    return socket.close(1000, "Вы закрыли соеденение.");
  var url;
  socket = new WebSocket("wss://innovative-smoggy-cheetah.glitch.me");
  socket.onopen = function() { // При подключении
    input.disabled = false;
    btn.disabled = true;
    setInterval(() => socket.send("null"), 30000)
    document.getElementsByClassName("mdl-chip__text").item(0).innerText =
      "Отсоедениться";
    document.getElementsByClassName("mdl-chip").item(0).style.width = 90;
    document.getElementById("connect-icon").innerText = "remove_circle";
    function submitOnEnter(event){
    if(event.which === 13 && !event.shiftKey) {
        send();
        event.preventDefault(); 
    }
    setTimeout(() => {    
      btn.disabled = false;
    }, 3000)
    }
    document.getElementById("msgbox").addEventListener("keypress", submitOnEnter);
  };
  socket.onmessage = function(e) { // При приходе сообщений
    var content = e.data
    if (content == "Вы были упомянуты") {
      alert("Тест пинга")
      return; 
  };
    var box_chip = document.createElement("span");
    box_chip.className = "e-mdl-chip";
    var box_text = document.createElement("span");
    box_text.className = "e-mdl-chip__text";
    box_text.innerHTML = content
    box_chip.appendChild(box_text);
    document.getElementById("messages").appendChild(box_chip);
    document.getElementById("messages").innerHTML += "</br>";
    document.getElementById("messages").scrollTop = 10000000000000000000000000
  }
  socket.onclose = function(e) {
    input.disabled = true;
    btn.disabled = true;
    document.getElementById("messages").innerText = "";
    document.getElementsByClassName("mdl-chip__text").item(0).innerText =
      "Присоеденится";
    document.getElementsByClassName("mdl-chip").item(0).style.width = 80;
    document.getElementById("connect-icon").innerText = "add";
    window.location.reload(false);
  }
}
function send() {
  socket.send(document.getElementById("msgbox").value);
  document.getElementById("msgbox").value = ""
}

// звёзды нах
 /*var additionalStars, canvas, context, drawStar, height, i, initialStars, ref, stars, timedStars, width;
$(function() {
  width = screen.width;
  height = screen.height;
  stars = 1;
  additionalStars = Math.round((width * height) / 3500);
  initialStars = Math.round((width * height) / 15000);

  console.log(initialStars);

  canvas = $('#stars');
  context = canvas[0].getContext("2d");

  context.canvas.width = width;
  context.canvas.height = height;

  drawStar = function(color) {
    var min, x, y;
    context.fillStyle = color;
    min = 15;
    x = Math.random() * (width - min) + min;
    y = Math.random() * (height - min) + min;
    return context.fillRect(x, y, 2, 2);
  };

  for (i = 1, ref = initialStars; 1 <= ref ? i <= ref : i >= ref; 1 <= ref ? i++ : i--) {
    drawStar('white');
  }

  timedStars = function() {
    if (stars < additionalStars) {
      drawStar('#CB82C0');
      return stars++;
    }
  };

  setInterval(timedStars, 100);
});
*/
if (!/Android|webOS|iPhone|iPad|iPod|pocket|psp|kindle|avantgo|blazer|midori|Tablet|Palm|maemo|plucker|phone|BlackBerry|symbian|IEMobile|mobile|ZuneWP7|Windows Phone|Opera Mini/i.test(navigator.userAgent)){
     window.onload = function () {
         document.getElementById('sendm').style.display = 'none';
     }
   };
var isFirefox = window.navigator.userAgent.includes('Firefox');
if(isFirefox) {
alert('Отправка сообщений и отображение сообщений работают плохо на браузере Mozilla Firefox!\nИмейте в виду...');
}
