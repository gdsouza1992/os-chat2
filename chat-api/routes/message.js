import { normalize, schema } from 'normalizr';

const models = require('../models')
const Message = models.message;
const Conversation = models.conversation;

const utils = require('../lib/utils');

// IMPORT ROUTES
// =============================================================================
const router = require('express').Router();

// on routes that end in /message/:convoId or /messages/:convoId
// ----------------------------------------------------
router.route('/:conversation_id')

// get messages by conversation id
.get(function(req, res) {
    var message = Message.build();
    message._modelOptions.instanceMethods.retrieveMessagesByConvoId(req.params.conversation_id)
    .then((messagesData) => {

        const data = utils.makeMessagesObjects(messagesData);
        // console.log(messagesData);
        // console.log(utils);

        // const data = utils.makeMemberUserObjects(groupData);
        // console.log(data)
        const user = new schema.Entity('user');
        const message = new schema.Entity('messages', { user });
        const MessageSchema = { messages: [ message ] }
        const normalizedData = normalize(data, MessageSchema);
        console.log(normalizedData.entities.messages);
        res.json(normalizedData);
        res.json(data)
        // res.json(normalizedData);
        // res.json({test: "ASDFA"})
    })
    .catch((error) => {
        console.log(error)
        console.log("ERROR")
        res.send(error)
    })


    // function(messages) {
    //     if (messages) {
    //       res.json(messages);
    //     } else {
    //       res.send(401, "User not found");
    //     }
    //   }, function(error) {
    //     res.send("User not found");
    //   });
})

//add message given uid and convo id
.post(function(req, res) {

    console.log(req.body);
    
    var conversationId = req.params.conversation_id;
    var content = req.body.content;
    var userId = req.body.userId;
    var message = Message.build();
    message._modelOptions.instanceMethods.add(content, conversationId, userId)
    .then((data) => {
        const insertedMsgId = data.dataValues.id;
        message._modelOptions.instanceMethods.retrieveMessagesById(insertedMsgId).then((data) => {
            console.log(data)
            res.send(data);
        })
        .catch((error) => {
            res.send(error);
        })
    })
    .catch((error) => {
        res.send(error);
    });

    // function(success){
    //     res.json({ message: 'Message added to group!' });
    // },
    // function(err) {
    //     res.send(err);
    // });
})

// Middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Message route.');
    next();
});


module.exports = router;