const DataTypes = require("sequelize");
const db = require('../lib/db');
const utils = require('../lib/utils');
const sequelize = db.sequelize;

const Conversation = sequelize.define('conversation', {
    name : {
        type: DataTypes.STRING
    },
    privacy: {
        type: DataTypes.BOOLEAN
    },
    conversationType: {
        type: DataTypes.STRING
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
      retrieveById: function(conversation_id) {
            return Conversation.find({where: {id: conversation_id}}, {raw: true});
      },
      retrievePublicByName: function(conversationName) {
            return Conversation.findAll(
              {
                where: {
                  name: {
                    $like: `%${conversationName}%`
                  },
                  privacy: false
                }, 
              }, {
                raw: true
              }
            );
      },
      retrieveAll: function(){
            return Conversation.findAll({raw: true});
      },
      add: function(name, privacy, conversationType) {
            const newData = {name: name, privacy: privacy, conversationType: conversationType};

            return Conversation.build(newData).save();
       },
      updateById: function(conversation_id) {
            const id = conversation_id;
            const name = this.name;
            const privacy = this.privacy;
            const conversationType = this.conversationType;
            const updatedData = utils.removeNullProps({name: name, privacy: privacy, conversationType: conversationType});
            return Conversation.update(updatedData,{where: {id: id} });
       },
      removeById: function(conversation_id) {
            return Conversation.destroy({where: {id: conversation_id}});
      }
      // getPrivacyByConvoId: function(conversation_id){
      //     return Conversation.find({where: {id: conversation_id}})
      // }

    }
  });

Conversation.associate = function(models){
      Conversation.hasMany(models.GroupMember);
      Conversation.hasMany(models.Message);
  }

module.exports = Conversation;




