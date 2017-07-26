var _ = require('lodash');

var Sequelize = require("sequelize");
var path      = require("path");
var env       = process.env.NODE_ENV || "dev";
var config    = require(path.join(__dirname, '..', 'config', 'database.json'))[env];



var sequelize = new Sequelize(config.database, config.user, config.password, config.options);

var models = require('../models');

// Test incerment user unread counts
sequelize.sync({force: false}).then(()=>{
    groupMember = models.groupMember.build();
    groupMember._modelOptions.instanceMethods.incrementUnreadCountExceptUser(3,3)
    .then((data) => {
        console.log(data);
    })
});