var mongoose = require('mongoose');
var fetch = require('node-fetch');
var crmUrl = 'https://crmint.iqmetrix.net/v1/Companies({CompanyID})';
var customerEndpoint = '/CustomerFull({CustomerID})'
var Conversation = require('../models/conversations');
var cors = require('cors')

var options = { 
  headers: {
    'Authorization': 'Bearer MVB1Td3-ck0xS3RNMcNFTTFRAQ4JIhwZa2E9GloARToJMhcoeBEmL1o4ORRZFTc7RRQvNV09JCpcMR4ueSIUDGM2DAt7NzkffSMH',
    'Content-Type': 'application/json'
  }
}

// Map routes to controller functions
module.exports = function(router) {
  router.get('/error', function(req, resp) {
    throw new Error('Derp. An error occurred.');
  });

  //Create Conversation
  router.options('/company/:cid/conversation', cors())
  router.post('/company/:cid/conversation', cors(), (req, res) => {



          var newConversation = new Conversation({
            customer: {
              firstName: 'Travis', 
              lastName: 'Scott',
              id: '22'
            },
            employees: [{
              firstName: 'Iq',
              lastName: 'Metrix',
              id:'1'
            }],
            updatedAt: Date.now(),
            contactMethods: [],
            selectedContactMethod: req.body.selectedContactMethodId || crmObject.ContactMethods[0].Id,
          });
          
          newConversation.save((err, newConversation) => {
            if(err) console.log(err);
            res.status(200).send(newConversation);
          });
  });

  router.get('/company/:cid/conversation', (req, res) => {
      Conversation.find((err, conversations) => {
        if (err) return console.error(err);
        res.status(200).send(conversations);
      });
  });

  router.get('/company/:cid/conversation/:id', (req, res) => {
    Conversation.findOne({'_id': req.params.id}, (err, result) => {
      if (err) return console.error(err);
        res.status(200).send(result);
    });
  });
};
