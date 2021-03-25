     var socket;
      var input = document.getElementsByClassName("msbox").item(0);
      input.disabled = true;
      var btn = document.getElementsByClassName("send").item(0);
      btn.disabled = true;
      function connect() {
        if (socket && socket.readyState == 1)
          return socket.close(1000, "Вы закрыли соеденение.");
        var url;

        socket = new WebSocket("wss://innovative-smoggy-cheetah.glitch.me");
        socket.onopen = function() {
          input.disabled = false;
          btn.disabled = false;
          document.getElementsByClassName("mdl-chip__text").item(0).innerText =
            "Отсоеденится";
          document.getElementsByClassName("mdl-chip").item(0).style.width = 90;
          document.getElementById("connect-icon").innerText = "remove_circle";
          document.addEventListener("keydown", function(event) {
            if (event.code == "Enter") {
              send();
            }
          });
        };
        socket.onmessage = function(e) {
          var box_chip = document.createElement("span");
          box_chip.classList.add("e-mdl-chip");
          var box_text = document.createElement("span");
          box_text.classList.add("e-mdl-chip__text");
          var text = document.createTextNode(e.data);
          box_text.appendChild(text);
          box_chip.appendChild(box_text);
          document.getElementById("messages").appendChild(box_chip);
          document.getElementById("messages").innerHTML += "</br>";
        };
        socket.onclose = function(e) {
          alert(
            "Сервер неожиданно завершил работу, код ошибки: " +
              e.code +
              " причина: " +
              e.reason
          );
          input.disabled = true;
          btn.disabled = true;
          document.getElementById("messages").innerText = "";
          document.getElementsByClassName("mdl-chip__text").item(0).innerText =
            "Присоеденится";
          document.getElementsByClassName("mdl-chip").item(0).style.width = 80;
          document.getElementById("connect-icon").innerText = "add";
        };
      }
      function send() {
        socket.send(document.getElementById("msgbox").value);
        document.getElementById("msgbox").value = "";
      }