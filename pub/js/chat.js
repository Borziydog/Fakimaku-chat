let socket = io();
socket.on('connect', function () {
    let params = getParams();

    socket.emit('join', params, function (err) {
        if (err) {
            alert(err);
            window.location.href = '/join';
        } else {
            console.log('OK!');
        }
    })
})
window.onoffline = function () {
    $('#offline').html('<h3>Уупс! Вы потеряли связь с Интеренетом.<br>Fakimaku не может работать без подключения к Интернету.</h3>');
}
window.ononline = function () {
    $('#offline').hide();
}

function getParams() {
    let paramsTxt = decodeURI(window.location.search.slice(1));
    let paramsObj = {};
    paramsTxt.split('&').forEach((item) => {
        let key = item.split('=')[0];
        let val = item.split('=')[1];
        paramsObj[key] = val;
    })

    return paramsObj;
}

function scrollToBottom() {
    let messages = document.getElementById('messages');
    messages.scroll(0, 1000);
}

socket.on('updateUserList', function (users) {
    let ol = $("<ol></ol>");
    let olCount = 0;
    users.forEach((user) => {
        let li = $("<li>").append(user);
        ol.append(li);
    })
    $("#users").append(ol);
})

socket.on('newMessage', function (msg) { // notifications soon
    let template = $("#message-template").html();
    let time = moment(msg.createAt).format('h:mm a');
    let html = Mustache.render(template, {
        time,
        from: msg.from,
        text: msg.text
    })

    let templateLink = $("#link-template").html();
    let timeLink = moment(msg.createAt).format('h:mm a');
    let link = Mustache.render(templateLink, {
        timeLink,
        from: msg.from,
        text: `<a href="${msg.text}/?lf=lf" class="link">${(msg.text).replace(/lf=lf.*/, '')}</a>`
    })

    if (msg.text.includes('https://') || msg.text.includes('http://')) {
        console.warn('link detected!');
        $("#messages").append(link);
        scrollToBottom();
    } else {
        $("#messages").append(html);
        scrollToBottom();
    }

});

socket.on('newLocationMessage', function (msg) {
    let template = $("#location-message-template").html();
    let time = moment(msg.createAt).format('h:mm a');
    let html = Mustache.render(template, {
        time,
        from: msg.from,
        url: msg.url
    })

    $("#messages").append(html);
    scrollToBottom();
})

$("#message-form").on("submit", function (e) {
    e.preventDefault();

    let messageBox = $('input[name=message]');

    socket.emit('createMessage', {
        text: messageBox.val()
    }, function () {
        messageBox.val('');
        document.getElementById('sendMessage').disabled = true;
        setTimeout(() => {
            document.getElementById('sendMessage').disabled = false;
        }, 1000);
    })
})

let locationBtn = $("#sendGeolacation");
locationBtn.on("click", function () {
    if (!navigator.geolocation) {
        return alert('Функция геолокации не поддерживается вашим браузером.');
    }

    locationBtn.prop('disabled', true).text('Жди...');
    navigator.geolocation.getCurrentPosition(function (position) {
        locationBtn.prop('disabled', false).html('<i class="fas fa-map-marker-alt" style="padding: 8px; font-size: 28px;"></i>');
        socket.emit('createLocationMessage', {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }, function () {

        })
    }, function () {
        locationBtn.prop('disabled', false).html('<i class="fas fa-map-marker-alt" style="padding: 8px; font-size: 28px;"></i>');
        alert('Ошибка при фетче геолокации.');
    })
})