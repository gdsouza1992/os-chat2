var Sequelize = require("sequelize");
var path      = require("path");
var env       = process.env.NODE_ENV || "dev";
var config    = require(path.join(__dirname, '..', 'config', 'database.json'))[env];
// var models    = require('../models');

// console.log(config)

var sequelize = new Sequelize(config.database, config.user, config.password, config.options);
var db        = {};




db.sequelize = sequelize;
db.Sequelize = Sequelize;





module.exports = db;