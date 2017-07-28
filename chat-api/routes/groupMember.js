import { normalize, schema } from 'normalizr';

const models = require('../models');
const utils = require('../lib/utils');



const GroupMember = models.groupMember;
const User = models.user;

// IMPORT ROUTES
// =============================================================================
const router = require('express').Router();
// on routes that end in /users
// ----------------------------------------------------
router.route('/')


router.route('/role')
.get(function(req, res){
    var userId = req.query.user;
    var conversationId = req.query.conversation;
    var groupMember = GroupMember.build();
    groupMember._modelOptions.instanceMethods.getUserByIdConversationId(conversationId, userId)
    .then((data) => {
        res.json(data);
    })
    .catch((error) => {
        res.send("Cound not get user role.");
    })
})


router.route('/reset')
.post(function(req, res){
    var conversationId = req.body.conversationId;
    var userId = req.body.userId;
    var groupMember = GroupMember.build();
    groupMember._modelOptions.instanceMethods.setUnreadCount(conversationId, userId)
    .then((data) => {
        res.json({conversationId, status:'reset'})
    })
    .catch((error) => {
        res.send("Unread count could not be reset.");
    });
})

// on routes that end in /groupMember/:group_id or /groupMembers/:group_id
// ----------------------------------------------------
router.route('/:conversation_id')
.post(function(req, res) {

    const newGroupMembers = req.body.groupMembers;

    GroupMember.bulkCreate(newGroupMembers)
    .then((data) => { // Notice: There are no arguments here, as of right now you'll have to...
        res.json(data)
    })
    .catch((error) => {
        res.send("Unread count could not be reset.");
    });
    

    // var conversation = Conversation.build();
    // conversation.name = req.body.name;
    // conversation.privacy = req.body.privacy;
    // conversation.conversationType = req.body.conversationType;
    // conversation._modelOptions.instanceMethods.updateById(req.params.conversation_id)
    // // .then((data) => {
      // res.json({ message: 'Conversation updated!' });
    // })
    // .catch((error) => {
      // res.json(newGroupMembers);
    // });
    // conversation.updateById(req.params.conversation_id, function(success) {
    //     if (success) {
    //         res.json({ message: 'Conversation updated!' });
    //     } else {
    //       res.send(401, "Conversation not found");
    //     }
    //   }, function(error) {
    //       res.send("Conversation not found");
    //   });
})


// update a group where conversation id and user id given
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
    //       res.send("Conversation not found");
    //   });
})

// get groupMembers by conversation_id
.get(function(req, res) {
    var groupMember = GroupMember.build();
    groupMember._modelOptions.instanceMethods.retrieveByConvoId(req.params.conversation_id)
    .then((groupData) => {
        const data = utils.makeMemberUserObjects(groupData);

        const user = new schema.Entity('user');
        const groupMember = new schema.Entity('groupMembers', { user });
        const GroupMemberSchema = { groupMembers: [ groupMember ] }
        const normalizedData = normalize(data, GroupMemberSchema);

        // res.json(normalizedData);
        res.json(normalizedData);
    })
    .catch((error) => {
        res.send(error);
    });

    // groupMember.retrieveByConvoId(req.params.conversation_id, function(groupMembers) {
    //     if (groupMembers) {
    //       res.json(groupMembers);
    //     } else {
    //       res.send(401, "Conversation not found");
    //     }
    //   }, function(error) {
    //     res.send("Conversation not found");
    //   });
})


router.route('/user/:user_id')
// get groups by user_id
.get(function(req, res) {
    var groupMember = GroupMember.build();
    groupMember._modelOptions.instanceMethods.retrieveByUserId(req.params.user_id)
    .then((data) => {
        res.json(data)
    })
    .catch((error) => {
        res.send('Conversation not found');
    });

    // groupMember.retrieveByUserId(req.params.user_id, function(groups) {
    //     if (groups) {
    //       res.json(groups);
    //     } else {
    //       res.send(401, "Conversation not found");
    //     }
    //   }, function(error) {
    //     res.send("Conversation not found");
    //   });
})

// add uid to convoid in groupMember
.post(function(req, res) {
    var userId = req.params.user_id;
    var conversationId = req.body.conversationId;
    var role = req.body.role;
    var groupMember = GroupMember.build();
    groupMember._modelOptions.instanceMethods.add(userId,conversationId,role)
    .then((data) => {
        var user = User.build();
        user._modelOptions.instanceMethods.retrieveById(userId)
        .then((userData) => {
            res.json(userData);
        })
        
    })
    .catch((error) => {
        res.send('Conversation not found');
    });

    // groupMember.add(function(success){
    //     res.json({ message: 'User added to group!' });
    // },
    // function(err) {
    //     res.send(err);
    // });
})

// update a groupMember unread with convo id and user id 
.put(function(req, res) {
    var userId = req.params.user_id;
    var conversationId = req.body.conversationId;
    var unread = req.body.unread;
    var groupMember = GroupMember.build({ userId: userId, conversationId :conversationId, unread: unread});
    groupMember._modelOptions.instanceMethods.updateByUserIdConvoId()
    .then((data) => {
        res.json({ message: 'GroupMember updated!' });
    })
    .catch((error) => {
        res.send('Conversation not found');
    });

    // groupMember.updateByUserIdConvoId(function(success) {
    //     if (success) {
    //         res.json({ message: 'GroupMember updated!' });
    //     } else {
    //       res.send(401, "GroupMember not found");
    //     }
    //   }, function(error) {
    //     res.send("GroupMember not found");
    //   });
})

router.route('/user/delete/:user_id')
// delete a groupmeber by uid and convo id
.post(function(req, res) {
    var conversationId = req.body.conversationId;
    var userId = parseInt(req.params.user_id);
    var groupMember = GroupMember.build();
    groupMember._modelOptions.instanceMethods.setSoftDelete(conversationId, userId)
    .then((data) => {
        const removedConversation = ({
            conversation : {
                id : conversationId
            },
            user: {
                userId : userId
            }
        });
        console.log(removedConversation);
        res.json(removedConversation);
    })
    .catch((error) => {
        res.send('Conversation not found');
    });

    // groupMember.removeByUserIdConvoId(function(conversation) {
    //     if (conversation) {
    //       res.json({ message: 'GroupMember removed!' });
    //     } else {
    //       res.send(401, "GroupMember not found");
    //     }
    //   }, function(error) {
    //     res.send("GroupMember not found");
    //   });
});


// Middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('GroupMember route');
    next();
});


module.exports = router;