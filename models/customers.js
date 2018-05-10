var mongoose = require('mongoose');

var customerSchema = mongoose.Schema({
    info: {
        firstName: String,
        lastName: String,
    },
    updatedAt: Date,
    createdAt: Date,
});

module.exports = mongoose.model('Customer', customerSchema);