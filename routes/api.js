var router = require('express').Router();
var userCtrl = require('../controllers/users');
var listCtrl = require('../controllers/lists');

router.get('/users', userCtrl.index);


module.exports = router;