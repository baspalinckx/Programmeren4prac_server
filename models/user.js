/**
 * Created by Bas Palinckx on 13-6-2017.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var uristring =
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://admin:admin@ds123662.mlab.com:23662/usermovieapp';

var userSchema = mongoose.Schema({
    email: String,
    hashed_password: String,
});

mongoose.Promise = global.Promise;
mongoose.connect(uristring, function(err, res) {
    if (err) {
        console.log('ERROR connecting to ' + uristring + '. ' + err);
    } else {
        console.log('Succeeded connection to: ' + uristring);
    }
});

module.exports = mongoose.model('user', userSchema);
