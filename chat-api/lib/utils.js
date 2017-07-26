const utils = {}

utils.removeNullProps = (obj) => {
    for (var propName in obj) { 
        if (obj[propName] === null || obj[propName] === undefined) {
            delete obj[propName];
        }
    }
    return obj;
}

utils.makeMemberUserObjects = (memberArray) => {
    return {
            groupMembers: memberArray.map(function(member){
                const user = {}
                user.id = member.userId
                delete member.userId
                user.username = member.username
                delete member.username
                member.user = user
                return member;
            })
        }
    }

utils.makeMessagesObjects = (messagesArray) => {
    return {
        messages: messagesArray.map((message) => {
            const messageObject = message.dataValues;
            const user = message.user.dataValues;
            messageObject.user = user;
            return messageObject;
        })
    }
}

    // return memberArray.map(function(member){
    //             const user = {}
    //             user.id = member.userId
    //             delete member.userId
    //             user.username = member.username
    //             delete member.username
    //             member.user = user
    //             return member;
    //         })


module.exports = utils;