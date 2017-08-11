var express = require('express');
var router = express.Router();
var userCtrl = require('./../controllers/users');

router.get('/profile', userCtrl.index);
router.get('/home', userCtrl.home)
router.get('/user/:id/login', userCtrl.settings);
router.get('/new', userCtrl.newMap);

// user settings

// map location

// notification settings

module.exports = router;
