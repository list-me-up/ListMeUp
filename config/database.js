require('dotenv').config();
const mongoose = require('mongoose');
mongoose.Promise = Promise;

mongoose.connect(process.env.DATABASE_URL);

var db = mongoose.connection;
db.once('open', function() {
    console.log(`Mongoose connected to: ${process.env.DATABASE_URL}`);
});

db.on('error', function(err) {
    console.log(`Database error:\n${err}`);
});