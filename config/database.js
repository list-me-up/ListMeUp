var mongoose = require('mongoose');
mongoose.Promise = Promise;

mongoose.connect('mongodb://localhost/ListMeUp');

// shortcut to mongoose.connection object
var db = mongoose.connection;
db.once('open', function() {
    console.log(`Mongoose connected to: ${process.env.DATABASE_URL}`);
});

db.on('error', function(err) {
    console.log(`Database error:\n${err}`);
});