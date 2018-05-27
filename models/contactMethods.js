var mongoose = require('mongoose');

var contactMethodSchema = mongoose.Schema({
  id: String,
  name: String
});

module.exports = mongoose.model('ContactMethod', contactMethodSchema);