var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var listSchema = new Schema({
    text: String,
}, {
    timestamps: true
});

var userSchema = new Schema({
    name: String,
    email: String,
    googleId: String,
    weatherLocation: {lat: Number, lng: Number},
    phoneNumber: String,
    time: Number,
    photo: String,
    list: [listSchema],
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);