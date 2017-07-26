const user = require('./user');
const conversation = require('./conversation');
const groupMember = require('./groupMember');
const message = require('./message');

const db = require('../lib/db');
const sequelize = db.sequelize;

const force = false;
const models = {User: user, Conversation: conversation, GroupMember: groupMember, Message: message};

user.associate(models);
conversation.associate(models);
groupMember.associate(models);
message.associate(models);


sequelize.sync({force: force})


module.exports = {
    user,
    conversation,
    groupMember,
    message
}