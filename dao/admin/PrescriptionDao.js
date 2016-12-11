"use strict";

var moduleName = __filename;
var cache = require('service/cache').local;
var logger = require('helper/Logger.js')(moduleName);

var connection = require('service/mysql/Pool.js');
var utilDao = require('dao/util/UtilDao.js');
var PrescriptionDao = function () { }

PrescriptionDao.prototype.addPrescription = function (data, cb) {
    logger.debug("Add prescription method call start (addPrescription())");
    var date = utilDao.getMySqlFormatDateTime(null);
    var queryData = {};
    queryData.user_id = data.logged_in_user.user_id;
    queryData.title = data.title;
    queryData.relative_path = data.relative_path;
    queryData.created_date = date;
    queryData.created_by = data.logged_in_user.user_id;
    queryData.edited_date = date;
    queryData.edited_by = data.logged_in_user.user_id;
    
    var query = [];
    query.push(" INSERT INTO user_prescription SET ? ");
    query = query.join("");


    var mySqlQuery = connection.query(query,[queryData], function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("login query = " + mySqlQuery.sql);
}

PrescriptionDao.prototype.getList = function (data, cb) {
    logger.debug("Add prescription method call start (addPriscription())");
    
    var query = [];
    query.push(" SELECT id,title,relative_path,created_date from user_prescription WHERE user_id = ? ");
    if(data.id){
        query.push(" AND id = ? ");
    }
    query = query.join("");


    var mySqlQuery = connection.query(query,[data.logged_in_user.user_id, data.id], function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("login query = " + mySqlQuery.sql);
}

module.exports = PrescriptionDao;