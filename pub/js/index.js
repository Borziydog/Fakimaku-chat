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
    document.getElementById("wrapper").scrollTo(0, 1000);
    document.getElementById("messages").scrollTo(0, 99999);
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
  document.getElementById("msgbox").value = "";
}

if (!/Android|webOS|iPhone|iPad|iPod|pocket|psp|kindle|avantgo|blazer|midori|Tablet|Palm|maemo|plucker|phone|BlackBerry|symbian|IEMobile|mobile|ZuneWP7|Windows Phone|Opera Mini/i.test(navigator.userAgent)){
     window.onload = function () {
         document.getElementById('sendm').style.display = 'none';
     }
   };
