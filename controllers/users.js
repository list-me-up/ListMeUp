var User = require('../models/user');

function index(req, res) {
    var u = req.user;

    if (u.lat && u.lon && u.phoneNumber && u.time) {
        res.redirect('users/home', {user: req.user});
        // load to to-do list
    } else {
        // redirect to profile
        res.render('users/settings', {user: req.user});
    }
}

function home(req, res) {

}

function settings(req, res) {
    res.render('users/home', {user: req.user});
}

function newMap(req, res) {
    res.render('map', {user: req.user});
}

// check profile


// change time, location, 

module.exports = {
    index,
    settings,
    newMap,
    home
}