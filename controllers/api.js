var Joke = require('./../models/joke');

// exposing Joke API
function getJokes(req, res) {
    Joke.find({}, function(err, jokes) {
        res.status(200).json(jokes);
    });
}

function index(req, res) {
    res.json(req.user.list);
}

function create(req, res) {
    req.user.list.push(req.body);
    req.user.save(function(err) {
        res.json(req.user);
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
    getJokes,
    create,
    index,
    delete: deleteFact,
    update
}