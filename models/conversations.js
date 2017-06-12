var mongoose = require('mongoose');

var conversationSchema = mongoose.Schema({
  customer: {
    firstName: String, 
    lastName: String,
    id: String
  },
  employees: [{
      firstName: String,
      lastName: String,
      id: String
  }],
  updatedAt: Date,
  contactMethods: [{
    Id: String,
    CustomerId: String,
    ContactMethodCategoryId: String,
    ContactMethodCategory: String,
    ContactMethodTypeId: String,
    ContactMethodType: String,
    Default: Boolean,
    DoNotContact: Boolean,
    Notes: String,
    Value: String,
    Version: Number
  }],
  selectedContactMethod: String,
  communicationHistory: [{
      message: String,
      createdAt: Date,
      user: {
          id: String,
          isCustomer: Boolean
      }
  }]
});

module.exports = mongoose.model('Conversation', conversationSchema);