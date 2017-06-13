/**
 * Created by Bas Palinckx on 13-6-2017.
 */
var user = require('../models/user.js');
var bcrypt = require('bcryptjs');

exports.registerUser = function (name, email, password) {
    return new Promise(function (resolve, reject) {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);

        var newUser = new user({

            email: email,
            hashed_password: hash
        });

        newUser.save().then(function () {
            return resolve({ status: 201, message: 'User registered succesfully!' });
        }).catch(function (err) {
            if (err.code == 11000) {
                reject({ status: 409, message: 'User already registered' });
            } else {
                reject({ status: 500, message: 'Internal server error' });
            }
        });
    });
};