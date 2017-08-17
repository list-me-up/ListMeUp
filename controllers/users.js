var User = require('../models/user');
var geocoder = require('geocoder');
const PNF = require('google-libphonenumber').PhoneNumberFormat;
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

function index(req, res) {
    var u = req.user;
    if (u.weatherLocation.lat && u.weatherLocation.lng && u.phoneNumber && u.time) {
        res.render('list/to-do', {user: req.user});
    } else {
        res.render('users/settings', {user: req.user});
    }
}

function list(req, res) {
    res.render('list/to-do', {user: req.user});
}

function update(req, res) {
    let time = req.body.time
    req.user.time = time.replace(/ /, '');

    if (req.body.city && req.body.phoneNumber && req.body.time) {
        let phoneNumber = phoneUtil.parse(req.body.phoneNumber, 'US');
        req.user.phoneNumber = phoneUtil.format(phoneNumber, PNF.E164)

        geocoder.geocode(req.body.city, function (err, data) {
            req.user.city = req.body.city
            req.user.weatherLocation.lat = data.results[0].geometry.location.lat
            req.user.weatherLocation.lng = data.results[0].geometry.location.lng

            req.user.getCurrentWeather().then(weather => {
                req.user.currentWeather = weather
                req.user.save(function (err) {
                    res.redirect('/list');
                }); 
            })
        });
    } else {
        res.render('users/settings', {user: req.user});
    }
}

function settings(req, res) {
    res.render('users/settings', {user: req.user});
}

module.exports = {
    index,
    settings,
    list,
    update
}