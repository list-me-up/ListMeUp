var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var jokeSchema = new Schema({
    text: [String]
}, {
    timestamps: true
});

module.exports = mongoose.model('Joke', jokeSchema);