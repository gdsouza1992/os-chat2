var _ = require('lodash');

var Sequelize = require("sequelize");
var path      = require("path");
var env       = process.env.NODE_ENV || "dev";
var config    = require(path.join(__dirname, '..', 'config', 'database.json'))[env];



var sequelize = new Sequelize(config.database, config.user, config.password, config.options);

var models = require('../models');

//Get groupMembers by conversation Id
sequelize.sync({force: false}).then(()=>{
    console.log("Calling retrieveByConvoId");
    groupMember = models.groupMember.build();
    groupMember._modelOptions.instanceMethods.retrieveByConvoId(2)
    .then((data) => {
        console.log(data);
    })
});