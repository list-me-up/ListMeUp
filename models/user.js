const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('dotenv').config();

const token = process.env.TWILIO_TOKEN;
const accountSid = process.env.TWILIO_ACCOUNT;
const telephone = process.env.TWILIO_NUMBER

const twilio = require('twilio')(accountSid, token);

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

userSchema.methods.sendMessage = function() {
    twilio.messages.create({
        to: `+1${this.phoneNumber}`,
        from: telephone,
        body: `Hello, ${this.name}`,
    }, function (err, message) {
        if (err) {
            console.log(err);
        } else {
            console.log(message.sid);
        }
    });
}

module.exports = mongoose.model('User', userSchema);