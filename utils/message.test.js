const expect = require('expect');

var { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'Jen';
    var text = 'Some msg';
    var message = generateMessage(from, text);

    expect(typeof message.createAt).toBe('number');
    expect(message).toMatchObject({
      from,
      text
    })
  })
})

describe('generateLocationMessage', () => {
  it('should generate current location object', () => {
    var from = 'name';
    var lat = 15;
    var lng = 30;
    var url = `https://www.google.com/maps?q=15,30`;
    var msg = generateLocationMessage(from, lat, lng);

    expect(typeof msg.createAt).toBe('number');
    expect(msg).toMatchObject({
      from,
      url
    })
  })
})
