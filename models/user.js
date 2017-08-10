var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var listSchema = new Schema({
    text: String,
}, {
    timestamps: true
});

var userSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    googleId: String,
    location: {
        type: String,
        default: 'Los Angeles'
    },
    number: {
        type: String
    },
    time: {
        type: Number
    },
    list: [listSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);