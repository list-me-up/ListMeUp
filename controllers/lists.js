var User = require('../models/user');

function index(req, res) {
    res.json(req.user.list);
}

// show all items in your list
// show one item in your list
// add item to your list
// remove item from your list
// edit/update item in your list

// create a list item and add it to the array
function create(req, res) {
    console.log('user list loaded')
    req.user.list.push({ text: req.body.list});
    req.user.save(function(err) {
        res.json(req.user);
        console.log(req.user);
    });
}

module.exports = {
    create,
    index
}