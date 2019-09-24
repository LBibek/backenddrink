var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bookingusr = new Schema({

    fname: String,
    lname: String,
    email: String,
    address: String,
    contact: String,
    password: String,
    created: Date
});
exports.bookingusr = mongoose.model('Bookinguser', bookingusr);