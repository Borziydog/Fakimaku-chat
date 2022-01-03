class Users {
  constructor() {
    this.users = []
  }

  addUser(id, name, room) {
    var user = {
      id,
      name,
      room
    }
    this.users.push(user)

    return user;
  }

  removeUser(id) {
    var user = this.getUser(id);

    if(user){
      this.users = this.users.filter(_user => _user.id !== id);
    }

    return user;
  }

  getUser(id) {
    return this.users.filter(user => user.id === id)[0];
  }

  getUserList(room) {
    return this.users.filter(user => user.room === room).map(user => user.name);
  }
}

module.exports = {
  Users
}
