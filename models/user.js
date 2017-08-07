var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        default: 'Los Angeles'
    },
    number: {
        type: String,
        required: true
    },
    list: [String]
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);