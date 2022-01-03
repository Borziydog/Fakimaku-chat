const moment = require('moment');

var generateMessage = (from, text) => {
  return {
    from,
    text,
    createAt: moment().valueOf()
  }
}

var generateLocationMessage = function(from, lat, lng) {
  return {
    from,
    url: `https://www.google.com/maps?q=${lat},${lng}`,
    createAt: moment().valueOf()
  }
}

module.exports = {
  generateMessage,
  generateLocationMessage
}
