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
    console.log(req.body)
    let time = req.body.time
    req.user.time = time.replace(/:/, '')

    let phoneNumber = phoneUtil.parse(req.body.phoneNumber, 'US');
    req.user.phoneNumber = phoneUtil.format(phoneNumber, PNF.E164)

    geocoder.geocode(req.body.city, function (err, data) {
        req.user.city = req.body.city
        req.user.weatherLocation.lat = data.results[0].geometry.location.lat
        req.user.weatherLocation.lng = data.results[0].geometry.location.lng
        
        if (req.user.city && req.user.weatherLocation.lat && req.user.weatherLocation.lng && req.user.time && req.user.phoneNumber) {
            req.user.save(function(err) {
            // console.log(err);
                res.redirect('/list');
            }); 
        } else {
            res.render('users/settings');
        }
        // else {
        //     res.render('users/settings');
        // }
        
        // if (err) {
        //     console.log('HI!!!!', err);
        // }
        // req.user.save(function(err) {
        //     // console.log(err);
        //     if (err) return res.redirect('/');
        //     res.redirect('/list');
        // });
    });
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