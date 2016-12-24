"use strict";

var moduleName = __filename;
var cache = require('service/cache').local;
var logger = require('helper/Logger.js')(moduleName);

var connection = require('service/mysql/Pool.js');
var utilDao = require('dao/util/UtilDao.js');
var OfferDao = function () { }

OfferDao.prototype.getList = function (data, cb) {
    logger.debug("offer get list method call start (getList())");
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

OfferDao.prototype.getDetail = function (data, cb) {
    logger.debug("offer get list method call start (getDetail())");
    var query = [];
    query.push(" SELECT o.id,o.discount ");
    query.push(" ,o.description,o.code,o.from_date,o.thru_date ");
    query.push(" ,i.path ");
    query.push(" FROM offer as o ");
    query.push(" LEFT OUTER JOIN image as i on i.id = o.image_id ");
    query.push(" WHERE 1=1 ");
    var conditionArray = [];
    if(data.id){
        query.push(" AND o.id = ? ");
        conditionArray.push(data.id);
    }
    if(data.code){
        query.push(" AND o.code = ? ");
        conditionArray.push(data.code);
    }
    query = query.join("");

    var mySqlQuery = connection.query(query, conditionArray, function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("offer detail query = " + mySqlQuery.sql);
}

OfferDao.prototype.applyOffer = function (data, cb) {
    logger.debug("apply offer method call start (applyOffer())");
    var date = utilDao.getMySqlFormatDateTime(null);
    var queryData = {
        user_id: data.logged_in_user.user_id,
        offer_id: data.offer_id,
        created_date: date,
        edited_date: date,
        created_by: data.logged_in_user.user_id,
        edited_by: data.logged_in_user.user_id
    };
    
    var query = [];
    query.push(" insert into user_offer set ? ");
    query = query.join("");
    
    var mySqlQuery = connection.query(query, queryData, function (err, resultSet) {
        if (err) {
            logger.error("error "+JSON.stringify(err));
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("apply offer query = " + mySqlQuery.sql);
    
}
module.exports = OfferDao;