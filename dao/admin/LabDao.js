"use strict";

var moduleName = __filename;
var cache = require('service/cache').local;
var logger = require('helper/Logger.js')(moduleName);

var connection = require('service/mysql/Pool.js');

var LabDao = function () { }

LabDao.prototype.getList = function (data, cb) {
    logger.debug("lab get list method call start (getList())");
    var query = [];
    query.push(" SELECT l.id,l.name ");
    query.push(" ,a.address_line_1,a.address_line_2,a.city,a.state,a.latitude,a.longitude ");
    query.push(" ,i.path ");
    query.push(" FROM lab as l ");
    query.push(" LEFT OUTER JOIN address as a on a.id = l.address_id ");
    query.push(" LEFT OUTER JOIN image as i on i.id = l.image_id ");
    query = query.join("");


    var mySqlQuery = connection.query(query, function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("lab list query = " + mySqlQuery.sql);
}

module.exports = LabDao;