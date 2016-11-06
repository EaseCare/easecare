"use strict";

var moduleName = __filename;
var cache = require('service/cache').local;
var logger = require('helper/Logger.js')(moduleName);

var connection = require('service/mysql/Pool.js');

var OfferDao = function () { }

OfferDao.prototype.getList = function (data, cb) {
    logger.debug("lab get list method call start (getList())");
    var query = [];
    query.push(" SELECT o.id,o.discount ");
    query.push(" ,o.description,o.code,o.from_date,o.thru_date ");
    query.push(" ,i.path ");
    query.push(" FROM offer as o ");
    query.push(" LEFT OUTER JOIN image as i on i.id = o.image_id ");
    query = query.join("");


    var mySqlQuery = connection.query(query, function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("offer list query = " + mySqlQuery.sql);
}

module.exports = OfferDao;