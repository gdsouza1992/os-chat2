var _ = require('lodash');

var Sequelize = require("sequelize");
var path      = require("path");
var env       = process.env.NODE_ENV || "dev";
var config    = require(path.join(__dirname, '..', 'config', 'database.json'))[env];



var sequelize = new Sequelize(config.database, config.user, config.password, config.options);

var models = require('../models');

//Reset user unread counts
sequelize.sync({force: false}).then(()=>{
    console.log("Calling retrieveByConvoId");
    groupMember = models.groupMember.build();
    groupMember._modelOptions.instanceMethods.retrieveByConvoId(2)
    .then((data) => {
        console.log(data);
    })

    // console.log("Calling retrieveMessagesByConvoId");
    // messages = models.message.build();
    // messages._modelOptions.instanceMethods.retrieveMessagesByConvoId(2)
    // .then((data) => {
    //     console.log(data);
    // })
});






// var 
//     .catch((error) => {
//         console.log(error);
//     });

// .then(()=>{
//     models.User.create({ username: 'gareth'});
//     models.User.create({ username: 'van'});
//     models.User.create({ username: 'raj'});
//     models.User.create({ username: 'amar'});

//     // models.Conversation.create({ id: 1});
//     // models.Conversation.create({ id: 2});
//     // models.Conversation.create({ id: 3});

//     // models.DirectMessage.create({ConversationId: 1, UserId: 1, ReceiverId: 2});
//     // models.DirectMessage.create({ConversationId: 1, UserId: 2, ReceiverId: 1});
//     // models.DirectMessage.create({ConversationId: 3, UserId: 1, ReceiverId: 3});
//     // models.DirectMessage.create({ConversationId: 3, UserId: 3, ReceiverId: 1});

//     // models.Group.create({Private: 1, ConversationId: 2});

//     // models.GroupMember.create({GroupId: 1, UserId: 1});
//     // models.GroupMember.create({GroupId: 1, UserId: 2});
//     // models.GroupMember.create({GroupId: 1, UserId: 4});

// });