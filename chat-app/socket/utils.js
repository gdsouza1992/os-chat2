
const _ = require('lodash');
const utils = {};

utils.addClientToRooms = (client,rooms) => {
    _.forEach(rooms, (roomData) => {
        client.join(`conversation:${roomData.conversation.id}`);
    })
    return;
}

// utils.getRoomsFromORM(rooms){

// }


module.exports = utils;