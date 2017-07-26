const DataTypes = require("sequelize");
const db = require('../lib/db');
const sequelize = db.sequelize;
const models = require('../models');

const GroupMember = require('./groupMember');
const User = require('./user');


const Message = sequelize.define('message', {
        content: {
            type: DataTypes.TEXT('long')
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('NOW()')
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('NOW()')
        }
  }, {
    instanceMethods: {
      retrieveMessagesByConvoId: function(conversation_id) {
            return Message.findAll(
                {
                    include: [{model: User}],
                    where: {conversationId: conversation_id}
                }, { 
                    raw: true
                }
            );
      },

      add: function(content, conversationId, userId) {
            const newData = {content: content, userId: userId, conversationId: conversationId};
            return Message.build(newData).save();
            //Hooks to afterCreate()
       },
       retrieveMessagesById: function(messageId){
            return Message.find({ where: { id: messageId } });
       }
    } ,
    hooks: {
      afterCreate: (message, options) => {
        console.log("Called in hook");
        const conversationId = message.dataValues.conversationId;
        const userId = message.dataValues.userId;
        const groupMember = GroupMember.build();
        groupMember._modelOptions.classMethods.incrementUnreadCountExceptUserClass(conversationId,userId);

        // GroupMember._modelOptions.instanceMethods.incrementUnreadCountExceptUser(conversationId,userId);
      }
    }

  });

// Message.afterCreate('incrementUnreadHookAfter', (message, options) => {
//   console.log("Called in hook");
//   const conversationId = message.dataValues.conversationId;
//   const userId = message.dataValues.userId;
//   console.log(GroupMember);

//   // GroupMember._modelOptions.instanceMethods.incrementUnreadCountExceptUser(conversationId,userId);
// });

Message.associate = function(models) {
        // Get Conversation ID as FK into message
        Message.belongsTo(models.Conversation, {
          onDelete: "CASCADE",
        });

        // Get User ID as FK into message
        Message.belongsTo(models.User); 
    }

module.exports = Message;
