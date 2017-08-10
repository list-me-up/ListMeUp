var router = require('express').Router();
var userCtrl = require('../controllers/users');
var listCtrl = require('../controllers/lists');

// get all list items

// get one list item

router.get('/users', userCtrl.index);


module.exports = router;