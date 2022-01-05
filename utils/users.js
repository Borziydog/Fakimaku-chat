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
    var user1 = this.getUser(id);
    if(user1){
      return
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
    //console.log(this.users.filter(user => user.room === room).map(user => user.name))
    //return this.users.filter(user => user.room === room).map(user => user.name);
    var user1 = this.users.filter(user => user.room === room).map(user => user.name);
    var ol = `<ol id="Kakahi">` 
    var stroka1 = ""
    user1.forEach((user) => {
      var li = "<li>"+user+"</li>"
      stroka1 = stroka1 + li
    })
    var ol2 = ol + stroka1 + "</ol>"
    //console.log(ol2)
    return ol2
  }
}

module.exports = {
  Users
}
