var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/ListMeUp');

// shortcut to mongoose.connection object
var db = mongoose.connection;
db.once('open', function() {
    console.log(`Connected to MongoDB at ${db.host}:#{db.port}`);
});

db.on('error', function(err) {
    console.log(`Database error:\n${err}`);
});