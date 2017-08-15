var User = require('../models/user');

function index(req, res) {
    res.json(req.user.list);
}

function create(req, res) {
    req.user.list.push({ text: req.body.list});
    req.user.save(function(err) {
        res.json(req.user);
        console.log(req.user);
    });
}

function show(req, res) {
    User.findById(req.user._id, function(err, user) {
        res.render('users/show', {user: req.user, list: user.list.id(req.params.id)});
    });
}

function update(req, res) {
    User.findById(req.user._id, function(err, user) {
        var subDoc = user.list.id(req.params.id);
        console.log("YO", req.body);
        subDoc.set(req.body);
        console.log("SUBDOC", subDoc);

        user.save().then(function(saved) {
            res.send(saved);
        }).catch(function(err) {
            res.status(500).send(err);
        })

        // user.list.id({$set: {list: req.params.id}});
        // user.save(function(err) {
        //     res.redirect('/users/list');
        // });
    });
}

function deleteFact(req, res) {
    User.findById(req.user._id, function(err, user) {
        user.list.remove(req.params.id)
        user.save(function(err) {
            res.json(user.list);
        });
    });
}

// edit/update item in your list
module.exports = {
    create,
    index,
    show,
    update,
    delete: deleteFact
}