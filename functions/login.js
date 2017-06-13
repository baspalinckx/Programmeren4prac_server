/**
 * Created by Bas Palinckx on 13-6-2017.
 */

var user = require('../models/user.js');
var bcrypt = require('bcryptjs');

exports.loginUser = function (email, password) {
    return new Promise(function (resolve, reject) {
        user.find({ email: email }).then(function (users) {
            if (users.length == 0) {
                reject({ status: 404, message: 'User not found' });
            } else {
                return users[0];
            }
        }).then(function (user) {
            var hashed_password = user.hashed_password;

            if (bcrypt.compareSync(password, hashed_password)) {
                resolve({ status: 200, message: email });
            } else {
                reject({ status: 401, message: 'Invalid credentials' });
            }
        }).catch(function (err) {
            return reject({ status: 500, message: 'Internal server error' });
        });
    });
};