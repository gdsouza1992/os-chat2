const DataTypes = require("sequelize");
const db = require('../lib/db');
const GroupMember = require('./groupMember')
const sequelize = db.sequelize;


const User = sequelize.define('user', {
    username: {
        type: DataTypes.STRING,
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
        retrieveAll: function(onSuccess, onError){
            return User.findAll({raw: true});
        },
        retrieveUserByName: function(userName) {
            return User.findAll(
              {
                where: {
                  username: {
                    $like: `%${userName}%`
                  }
                }
              }, {
                raw: true
              }
            );
        },
        retrieveById: function(user_id, onSuccess, onError) {
            return User.find({where: {id: user_id}}, {raw: true});
        },
        add: function(onSuccess, onError) {
            var username = this.username;
            const newData = { username: username};
            return User.build(newData).save();
        },
        updateById: function(user_id, onSuccess, onError) {
            var id = user_id;
            var username = this.username;
            const updatedData = utils.removeNullProps({username: username});
            return User.update(updatedData,{where: {id: id} });
        },
        removeById: function(user_id, onSuccess, onError) {
            return User.destroy({where: {id: user_id}});
        },
        isUserAuth: function(user_id, conversation_id){
            return GroupMember.find({where: {userId: user_id, conversationId: conversation_id}});
        }
    }
  });

User.associate = function(models) {
    User.hasMany(models.GroupMember);
    User.hasMany(models.Message);
  }


module.exports = User;