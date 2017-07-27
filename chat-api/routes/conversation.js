const models = require('../models')
const Conversation = models.conversation;

// IMPORT ROUTES
// =============================================================================
const router = require('express').Router();
// on routes that end in /users
// ----------------------------------------------------
router.route('/')

// // // create a conversation 
.post(function(req, res) {
    var name = req.body.name;
    var privacy = req.body.privacy;
    var conversationType = req.body.type;
    var conversation = Conversation.build();
    conversation._modelOptions.instanceMethods.add(name, privacy, conversationType)
    .then((data) => {
        res.json(data);
    })
    .catch((error) => {
        console.log(error);
        res.send(401, "Conversations not created");
    })
})

// get all the conversations 
.get(function(req, res) {
    // console.log('Called')
    var conversation = Conversation.build();
    conversation._modelOptions.instanceMethods.retrieveAll()
    .then((data) => {
        res.json(data);
    })
    .catch((error) => {
        res.send(401, "Conversations not found");
    })
});


// // on routes that end in /conversation/:conversation_id or /conversations/:conversation_id
// // ----------------------------------------------------
router.route('/:conversation_id')

// // update a conversation 
.put(function(req, res) {
    var conversation = Conversation.build();
    conversation.name = req.body.name;
    conversation.privacy = req.body.privacy;
    conversation.conversationType = req.body.conversationType;

    conversation._modelOptions.instanceMethods.updateById(req.params.conversation_id)
    .then((data) => {
      res.json({ message: 'Conversation updated!' });
    })
    .catch((error) => {
      res.send("Conversation not found");
    });

    // conversation.updateById(req.params.conversation_id, function(success) {
    //     if (success) {
    //         res.json({ message: 'Conversation updated!' });
    //     } else {
    //       res.send(401, "Conversation not found");
    //     }
    //   }, function(error) {
    //     res.send("Conversation not found");
    // });

})

// // get a conversation by id
.get(function(req, res) {
    var conversation = Conversation.build();
    conversation._modelOptions.instanceMethods.retrieveById(req.params.conversation_id)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.send("Conversation not found");
    });

    // conversation.retrieveById(req.params.conversation_id, function(conversation) {
    //     if (conversation) {
    //       res.json(conversation);
    //     } else {
    //       res.send(401, "Conversation not found");
    //     }
    //   }, function(error) {
    //     res.send("Conversation not found");
    //   });
})

// // delete a conversation by id 
.delete(function(req, res) {
    var conversation = Conversation.build();
    conversation._modelOptions.instanceMethods.removeById(req.params.conversation_id)
    .then(() => {
      res.json({ message: 'Conversation removed!' });
    })
    .catch(() => {
      res.send(401, "Conversation not found");
    })

    // conversation.removeById(req.params.conversation_id, function(conversation) {
    //     if (conversation) {
    //       res.json({ message: 'Conversation removed!' });
    //     } else {
    //       res.send(401, "Conversation not found");
    //     }
    //   }, function(error) {
    //     res.send("Conversation not found");
    //   });
});

// Middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Conversation route');
    next();
});


module.exports = router;