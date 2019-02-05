const {from} = require('rxjs');
let User = require('../models/user');

class UserService {
    constructor() {

    }

    add(userObj) {
        let newUser = new User(userObj);
        return newUser.save();

    }

    get(queryObj) {
        return from(User.find(queryObj));
    }

    update(queryObj, userObj) {

    }

    delete(queryObj) {}
}

module.exports = UserService;