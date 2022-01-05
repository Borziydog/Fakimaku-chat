const expect = require('expect');

const { Users } = require('./users');

describe('Users', () => {
  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node'
    }, {
      id: '2',
      name: 'Jen',
      room: 'Node'
    }, {
      id: '3',
      name: 'Jay',
      room: 'Other'
    }]
  })

  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: '456',
      room: '789'
    }
    var newUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  })

  it('should remove a user', () => {
    var user = users.removeUser('1');

    expect(user.id).toBe('1');
    expect(users.users.length).toBe(2);
  })

  it('should not remove a user', () => {
    var user = users.removeUser('10');

    expect(user).toBeFalsy();
    expect(users.users.length).toBe(3);
  })

  it('should find user', () => {
    var user = users.getUser('1');

    expect(user.id).toBe('1');
  })

  it('should not find user', () => {
    var user = users.getUser('10');

    expect(user).toBeFalsy();
  })

  it('should return name for "node" room', () => {
    var userList = users.getUserList('Node');

    expect(userList).toEqual(['Mike', 'Jen'])
  })
})
