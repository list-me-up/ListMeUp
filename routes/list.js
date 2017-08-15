var router = require('express').Router();
var listCtrl = require('../controllers/lists');

router.get('/list/:id', listCtrl.show);
router.put('/list/:id', listCtrl.update);

module.exports = router;