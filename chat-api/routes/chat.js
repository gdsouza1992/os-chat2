const api = require('../api');

// IMPORT ROUTES
// =============================================================================
const router = require('express').Router();
// on routes that end in /messages/conversation_id or /message/conversation_id
// ----------------------------------------------------
router.route('/:convo_id')

// get a user by id
.get(function(req, res) {
    api.getConversations(1,(data) => {
      console.log(data);
    },(err)=>{
      console.log(err);
    });

    res.render('index',{
        pageType : 'chat'
    })
});

// Middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('called first');
    console.log('User route.');
    next();
});


module.exports = router;