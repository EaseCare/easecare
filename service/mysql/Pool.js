"use strict";

var mysql = require('mysql');

var config = require('config');
var connectionProperties = config.env.prop.orion.db;
console.log("prop are"+JSON.stringify(connectionProperties));
module.exports  = mysql.createPool({
  connectionLimit : connectionProperties.connectionLimit,
  host            : connectionProperties.host,
  user            : connectionProperties.user,
  password        : connectionProperties.password,
  database        : connectionProperties.database
});