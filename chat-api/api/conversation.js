// const models = require('../models')

// const conversationModel = models.conversation;
// const groupMemberModel = models.groupMember;
// const messageModel = models.message;

// const Conversation = {};

// Conversation.getUserConversations = (userId) => {
//     var groupMember = groupMemberModel.build();
//     groupMember.retrieveByUserId(userId);
// }

// Conversation.getConversationMessages = (conversationId) => {
//     var messages = messageModel.build();
//     message.retrieveMessagesByConvoId(conversationId);
// }

// Conversation.getGroupMemebers = (conversationId) => {
//     var groupMember = groupMemberModel.build();
//     groupMember.retrieveByConvoId(userId);
// }

// Conversation.addConversationMessage = (conversationId, userId, content) => {
//     var message = messageModel.build({content: content, userId: userId, conversationId: conversationId});
//     message.add();
// }

// module.exports = Conversation;