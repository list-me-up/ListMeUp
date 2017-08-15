var User = require('../models/user');

function index(req, res) {
    res.json(req.user.list);
}

// create a list item and add it to the array
function create(req, res) {
    // console.log('user list loaded')
    req.user.list.push({ text: req.body.list});
    req.user.save(function(err) {
        res.json(req.user);
        console.log(req.user);
    });
}

function show(req, res) {
    req.user.list[req.params.id];
    res.render('users/show', {list: req.user.list[req.params.id]});
}

function deleteFact(req, res) {
    User.findById(req.user._id, function(err, user) {
        user.list.remove(req.params.id)
        user.save(function(err) {
            res.json(user.list);
        });
    });
}

// show one item in your list
// edit/update item in your list
module.exports = {
    create,
    index,
    show,
    delete: deleteFact
}