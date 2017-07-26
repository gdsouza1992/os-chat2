var _ = require('lodash');

var Sequelize = require("sequelize");
var path      = require("path");
var env       = process.env.NODE_ENV || "dev";
var config    = require(path.join(__dirname, '..', 'config', 'database.json'))[env];



var sequelize = new Sequelize(config.database, config.user, config.password, config.options);

var models = require('../models');

//Reset user unread counts
sequelize.sync({force: false}).then(()=>{
    message = models.message.build();
    message._modelOptions.instanceMethods.add("Test content",3,3)
    .then((data) => {
        console.log("ADDED DATA");
        // console.log(data);
    })
});


