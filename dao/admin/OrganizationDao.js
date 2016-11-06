"use strict";

var moduleName = __filename;
var cache = require('service/cache').local;
var logger = require('helper/Logger.js')(moduleName);

var connection = require('service/mysql/Pool.js');

var OrganizationDao = function () { }

OrganizationDao.prototype.get = function (data, cb) {
    logger.debug("Get organization dao method call start (get())");
    var query = [];
    
    query.push(" SELECT o.id,o.name ");
    query.push(" ,o.email,o.address,o.website ");
    query.push(" FROM organization as o ");
    query = query.join("");


    var mySqlQuery = connection.query(query, function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet[0]);
    });
    logger.debug("Get organization query = " + mySqlQuery.sql);
}

module.exports = OrganizationDao;