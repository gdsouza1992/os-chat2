import { normalize, schema } from 'normalizr';

const models = require('../models');
const User = models.user;
const Conversation = models.conversation;

// IMPORT ROUTES
// =============================================================================
const router = require('express').Router();
// on routes that end in /users
// ----------------------------------------------------
router.route('/:term')
// search all
.get(function(req, res) {
    // console.log('Called')
    var conversation = Conversation.build();
    var user = User.build();

    var conversationSearchPromise = new Promise((resolve, reject) => {
        resolve(conversation._modelOptions.instanceMethods.retrievePublicByName(req.params.term));
    })

    var userSearchPromise = new Promise((resolve, reject) => {
        resolve(user._modelOptions.instanceMethods.retrieveUserByName(req.params.term));
    })

    Promise.all([conversationSearchPromise, userSearchPromise])
    .then((data) => {
        const searchResults = {
            conversations: data[0],
            users: data[1]
        }
        
        res.json(searchResults)
    })
    .catch((error) => {
        res.send(401, "Search not found");
    })
});



router.route('/conversation/:term')
// search all
.get(function(req, res) {
    // console.log('Called')
    var conversation = Conversation.build();
    conversation._modelOptions.instanceMethods.retrievePublicByName(req.params.term)
    .then((data) => {
        res.json(data);
    })
    .catch((error) => {
        res.send(401, "Conversations not found");
    })
});

router.route('/user/:term')
// search all
.get(function(req, res) {
    // console.log('Called')
    var user = User.build();
    user._modelOptions.instanceMethods.retrieveUserByName(req.params.term)
    .then((data) => {
        res.json(data);
    })
    .catch((error) => {
        res.send(401, "Conversations not found");
    })
});


// Middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log(req);
    console.log('search route');
    next();
});


module.exports = router;