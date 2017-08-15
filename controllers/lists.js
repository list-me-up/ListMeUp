function show(req, res) {
    res.render('list/show', {user: req.user, list: req.user.list.id(req.params.id)});
}

function update(req, res) {
    var toDo = req.user.list.id(req.params.id);
    toDo.text = req.body.list;

    req.user.save(function(err) {
        res.redirect('/list')
    });
}

module.exports = {
    show,
    update
}