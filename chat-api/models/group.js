const DataTypes = require("sequelize");

const Group = sequelize.define('group', {
        private : DataTypes.BOOLEAN,
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
      retrieveById: function(group_id, onSuccess, onError) {
            return Group.find({where: {id: group_id}}, {raw: true});
      },
      add: function(onSuccess, onError) {
            var private = this.private;
            return Group.build({private: private}).save();
       },
      removeById: function(group_id, onSuccess, onError) {
            return Group.destroy({where: {id: group_id}});
      }
    }
  });

Group.associate = function(models) {
        // Get conversation id as FK into Group
        Group.belongsTo(models.Conversation,{
            foreignKey: {
                allowNull: false
            }
        });
        // Get conversation id as FK into Group
        Group.hasMany(models.GroupMember); 
    }