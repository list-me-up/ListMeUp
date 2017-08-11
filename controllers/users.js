var User = require('../models/user');

function index(req, res) {
    var u = req.user;

    if (u.lat && u.lon && u.phoneNumber && u.time) {
        res.redirect('users/home');
        // load to to-do list
    } else {
        // redirect to profile
        res.render('users/settings');
    }
}

function home(req, res) {

}

function settings(req, res) {
    res.render('users/settings');
}

function newMap(req, res) {
    res.render('map');
}

// check profile


// change time, location, 

module.exports = {
    index,
    settings,
    newMap,
    home
}