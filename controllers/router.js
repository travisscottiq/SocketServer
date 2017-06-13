var mongoose = require('mongoose');
var fetch = require('node-fetch');
var crmUrl = 'https://crmint.iqmetrix.net/v1/Companies({CompanyID})';
var customerEndpoint = '/CustomerFull({CustomerID})'
var Conversation = require('../models/conversations');
var cors = require('cors')

var options = { 
  headers: {
    'Authorization': 'Bearer Uk1ON4bqQzdSVk83Ut5-N1JMI1wRCAZgIyceAWp8AXk6PxcAIyQJbSAbfwQIInlvHBp3TQYKOHsGHxpvawZ-URR_AFUHfRtGOzV9',
    'Content-Type': 'application/json'
  }
}

// Map routes to controller functions
module.exports = function(router) {
  router.get('/error', function(req, resp) {
    throw new Error('Derp. An error occurred.');
  });

   router.post('/message', (req, res) => {
       var phoneNumber = req.body.From.substring(2);
       var io = req.app.get('socketio');
       Conversation.findOne({'contactMethods.Value' : phoneNumber}, (err, res) => {
          if(err) console.log(err);

          console.log('s%%%%%%%%%%%%%%%%%');
          console.log(res);
          console.log('e%%%%%%%%%%%%%%%%%');
        });
        res.status(200).send();
      })

  //Create Conversation
  router.options('/company/:cid/conversation', cors())
  router.post('/company/:cid/conversation', cors(), (req, res) => {

    
    const customerCrmURL = crmUrl.replace('{CompanyID}', req.params.cid) + customerEndpoint.replace('{CustomerID}', req.body.crmId);
    var fetchObject = fetch(customerCrmURL, options)
      .catch(function(err) {
        console.log(err);
      })
      .then(function(res) {
          return res.text();
      }).then(function(body) {
          const crmObject = JSON.parse(body);
          var newConversation = new Conversation({
            customer: {
              firstName: crmObject.PrimaryName, 
              lastName: crmObject.FamilyName,
              id: crmObject.Id
            },
            employees: [{
              firstName: 'Iq',
              lastName: 'Metrix',
              id:'1'
            }],
            updatedAt: Date.now(),
            contactMethods: crmObject.ContactMethods,
            selectedContactMethod: req.body.selectedContactMethodId || crmObject.ContactMethods[0].Id,
          });
          
          newConversation.save((err, newConversation) => {
            if(err) console.log(err);
            res.status(200).send(newConversation);
          });

      });
      console.log(fetchObject);
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
