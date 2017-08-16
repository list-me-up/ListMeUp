const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var request = require('request');

require('dotenv').config();

const token = process.env.TWILIO_TOKEN;
const accountSid = process.env.TWILIO_ACCOUNT;
const telephone = process.env.TWILIO_NUMBER

const twilio = require('twilio')(accountSid, token);

var toDoListSchema = new Schema({
    text: String,
    sos: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

var userSchema = new Schema({
    name: String,
    email: String,
    googleId: String,
    weatherLocation: {lat: Number, lng: Number},
    phoneNumber: String,
    time: String,
    photo: String,
    list: [toDoListSchema]
}, {
    timestamps: true
});

userSchema.methods.getWeather = function() {
    const url = `https://api.darksky.net/forecast/b43f78358ca0251b8838368a5f9c0279/${this.weatherLocation.lat},${this.weatherLocation.lng}`
    
    return new Promise(function(resolve, reject) {
        request(url, function (error, response, body) {
            if (error) reject(error);
            let weatherData = JSON.parse(body)
            resolve({ forecast: weatherData.hourly.summary, icon: weatherData.hourly.icon });
        });
    });
}

userSchema.methods.sendMessage = function() {
    todo = this.list[0].text
    this.getWeather()
    .then(weather => {
        twilio.messages.create({
            to: this.phoneNumber,
            from: telephone,
            body: 
            `Hello, ${this.name} - today's forecast is ${weather.forecast} 

☑️${todo}`,
            mediaUrl: `https://s3-us-west-1.amazonaws.com/listmeup/${weather.icon}.png`,
        }, function (err, message) {
            if (err) {
                console.log(err);
            } else {
                console.log(message.sid);
            }
        });
    })
    .catch(function(err) {
        console.log('error:', error);
    });
}

module.exports = mongoose.model('User', userSchema);