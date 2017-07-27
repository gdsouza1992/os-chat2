const DataTypes = require("sequelize");
const db = require('../lib/db');
const sequelize = db.sequelize;

const User = require('./user');
const Conversation = require('./conversation');

const GroupMember = sequelize.define('groupMember', {
        unread: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('NOW()')
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('NOW()')
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: "pending"
        }
  }, {
    instanceMethods: {
      retrieveByConvoId: function(conversation_id) {
            return sequelize.query(
              'select * from groupMembers G inner join users U on G.`userId` = U.`id` where  G.`conversationId` = ?', 
              { replacements: [conversation_id], type: sequelize.QueryTypes.SELECT }
            );
      },
      retrieveByUserId: function(user_id) {
            return GroupMember.findAll(
                {
                    include: [{model: Conversation}],
                    where: {userId: user_id}
                },
                    {raw: true}
              );
      },
      getUserByIdConversationId: function(conversationId, userId){
            return GroupMember.findOne(
                {
                  where : {conversationId: conversationId, userId: userId}
                }
              );
      },
      removeByUserId: function(onSuccess, onError){
            return GroupMember.destroy({where: {conversationId: conversationId}});
      },
      add: function(userId, conversationId, role) {
            const newData = {userId: userId, conversationId: conversationId, unread: 0, role: role};
            return GroupMember.build(newData).save();
       },
      updateById: function(conversation_id, onSuccess, onError) {
            const id = conversation_id;
            const name = this.name;
            const privacy = this.privacy;
            const conversationType = this.conversationType;
            const updatedData = utils.removeNullProps({name: name, privacy: privacy, conversationType: conversationType});
            return Conversation.update(updatedData,{where: {id: id} });
       },
      updateByUserIdConvoId: function(onSuccess, onError) {
            const userId = this.userId;
            const conversationId = this.conversationId;
            const unread = this.unread;
            const updatedData = {unread: unread};
            return roupMember.update(updatedData, {where: {conversationId: conversationId, userId: userId}});
      },
      setUnreadCount: function(conversationId,userId,count = 0){
        const updatedData = {unread: count};
        return GroupMember.update(updatedData, {where: {conversationId: conversationId, userId: userId}});
      }

    } ,

    classMethods: {
      incrementUnreadCountExceptUserClass: function(conversationId,userId){
            console.log("incrementUnreadCountExceptUser",conversationId,userId);
            // const userId = userId;
            // const conversationId = conversationId;
            return GroupMember.update(
              {
                unread: sequelize.literal('unread +1')
              }, {
                where: 
                  { 
                    $and: [
                      {
                        conversationId: {
                          $eq: conversationId
                        }
                      },{
                        userId: {
                          $ne: userId
                        }
                      }
                    ]
                  }
                }
            );
      },
    }

  });

  GroupMember.associate = function(models) {
          // Get Conversation ID as FK into message
        GroupMember.belongsTo(models.Conversation, {
          onDelete: "CASCADE",
        });

        // Get User ID as FK into message
        GroupMember.belongsTo(models.User); 
      }

module.exports = GroupMember;