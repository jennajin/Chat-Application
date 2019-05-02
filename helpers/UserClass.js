class Users {
  constructor() {
    this.users = [];
  }

  AddUserData(id, name, room) {
    let users = { id, name, room };
    this.users.push(users);
    return users;
  }

  GetUser(id) {
    var getUser = this.users.filter(userId => {
      return userId.id === id;
    })[0];
    return getUser;
  }

  RemoveUser(id) {
    var user = this.GetUser(id);
    if (user) {
      this.users = this.users.filter(user => user.id !== id);
    }
    return user;
  }

  GetUsersList(room) {
    let users = this.users.filter(user => user.room === room);

    let namesArray = users.map(user => {
      return user.name;
    });

    return namesArray;
  }
}

module.exports = { Users };
