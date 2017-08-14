var User = require('../models/user');
var geocoder = require('geocoder');

function index(req, res) {
    var u = req.user;
    if (u.weatherLocation.lat && u.weatherLocation.lng && u.phoneNumber && u.time) {
        res.render('users/list', {user: req.user});
    } else {
        // redirect to profile
        res.render('users/settings', {user: req.user});
    }
}

function list(req, res) {
    var num = 1;
    res.render('users/list', {user: req.user});
}

function update(req, res) {
    req.user.phoneNumber = req.body.phoneNumber
    req.user.time = req.body.time
  
    geocoder.geocode(req.body.city, function (err, data) {
        req.user.weatherLocation.lat = data.results[0].geometry.location.lat
        req.user.weatherLocation.lng = data.results[0].geometry.location.lng
        req.user.save(function(err) {
            res.redirect('/users/list');
        });
    });
}

function settings(req, res) {
    res.render('users/settings', {user: req.user});
}

function addItem(req, res) {
    req.user.list.push({text: req.body.list});
    req.user.save(function(err) {
    // console.log(req.body.list)
    //     console.log(req.user)
    //     // console.l
        res.redirect('/users/list');
    });
}


module.exports = {
    index,
    settings,
    list,
    update,
    addItem
}
