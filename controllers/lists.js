var User = require('../models/user');


// show all items in your list
// show one item in your list
// add item to your list
// remove item from your list
// edit/update item in your list

// create a list item and add it to the array
function create(req, res) {
    User.findById(req.user.id, function(err, user) {
        user.list.push({
            content: req.body.content
        });
        user.save(function(err) {
            res.json(user);
        });
    });
}