function index(req, res) {
    res.json(req.user.list);
}

function create(req, res) {
    req.user.list.push(req.body);
    req.user.save(function(err) {
        res.json(req.user);
        console.log(req.user);
    });
}

function deleteFact(req, res) {
    req.user.list.remove(req.params.id)
    req.user.save(function(err) {
        res.json(req.user.list);
    });
}

function update(req, res) {
    var toDo = req.user.list.id(req.params.id);
    toDo.text = req.body.list;
    console.log(toDo.text);
    console.log("LIST", req.user.list);
    req.user.save(function(err) {
        res.json(req.user.list);
    });
}

module.exports = {
    create,
    index,
    delete: deleteFact,
    update
}