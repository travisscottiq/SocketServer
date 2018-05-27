var mongoose = require('mongoose');

var conversationSchema = mongoose.Schema({
  userId: String,
  shopifyId: String,
  messages: [{
    createdAt: Date,
    updatedAt: Date,
    message: String,
    contactInfoId: String
  }]
});

module.exports = mongoose.model('Conversation', conversationSchema);