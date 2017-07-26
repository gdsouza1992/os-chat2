var _ = require('lodash');

var Sequelize = require("sequelize");
var path      = require("path");
var env       = process.env.NODE_ENV || "dev";
var config    = require(path.join(__dirname, '..', 'config', 'database.json'))[env];



var sequelize = new Sequelize(config.database, config.user, config.password, config.options);

var models = require('../models');

//reset_user_unread_counts
sequelize.sync({force: false}).then(()=>{
    groupMember = models.groupMember.build();
    groupMember._modelOptions.instanceMethods.setUnreadCount(3,1)
    .then((data) => {
        console.log(data);
    })
});