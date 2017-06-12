var mongoose = require('mongoose');
var fetch = require('node-fetch');
var crmUrl = 'https://crmint.iqmetrix.net/v1/Companies({CompanyID})';
var customerEndpoint = '/CustomerFull({CustomerID})'
var Conversation = require('../models/conversations');

var options = { 
  headers: {
    'Authorization': 'Bearer RXVFWfygRVlFbkRZReZ1WUV0Kz4iPQkXCxkuKXJAEW4QFwtscBAwbh85KDEcFwJsCB4gAQlHBzF0FyAVLhswDRYXHzMJMxI6HwU0',
    'Content-Type': 'application/json'
  }
}

// Map routes to controller functions
module.exports = function(router) {
  router.get('/error', function(req, resp) {
    throw new Error('Derp. An error occurred.');
  });

  //Create Conversation
  router.post('/company/:cid/conversation', (req, res) => {


    const customerCrmURL = crmUrl.replace('{CompanyID}', req.params.cid) + customerEndpoint.replace('{CustomerID}', req.body.crmId);
    fetch(customerCrmURL, options)
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
            selectedContactMethod: req.body.selectedContactMethodId,
          });
          
          newConversation.save((err, newConversation) => {
            if(err) console.log(err);
            res.status(200).send(newConversation);
          });

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
