var express = require('express');
var router = express.Router();
var userCtrl = require('./../controllers/users');

router.get('/list', userCtrl.index);
router.get('/list', userCtrl.list)
router.get('/settings', userCtrl.settings);
router.put('/settings', userCtrl.update);
// router.post('/list', userCtrl.addItem);

module.exports = router;