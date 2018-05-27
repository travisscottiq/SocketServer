var mongoose = require('mongoose');

var contactMethodSchema = mongoose.Schema({
  id: String,
  contactMedthodId: String,
  info: String,
  isActive: Boolean
});

module.exports = mongoose.model('ContactMethod', contactMethodSchema);