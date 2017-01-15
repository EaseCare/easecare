"use strict";

var moduleName = __filename;
var cache = require('service/cache').local;
var logger = require('helper/Logger.js')(moduleName);

var connection = require('service/mysql/Pool.js');
var utilDao = require('dao/util/UtilDao.js');

var ImageDao = function () { }

ImageDao.prototype.getImageList = function (data, cb) {
    logger.debug("image get list method call start (getList())");
    var query = [];
    query.push(" SELECT * from image ");
    query = query.join("");


    var mySqlQuery = connection.query(query, function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("image query = " + mySqlQuery.sql);
}
ImageDao.prototype.getImageDetail = function (data, cb) {
    logger.debug("image get detail method call start (getImageDetail())");
    var query = [];
    query.push(" SELECT * from image where id = ?");
    query = query.join("");


    var mySqlQuery = connection.query(query,[data.id], function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("image detail query = " + mySqlQuery.sql);
}
ImageDao.prototype.addImage = function (data, cb) {
    logger.debug("image add image method call start (addImage())");

    var date = utilDao.getMySqlFormatDateTime(null);
    var queryData = {
        path: data.relative_path,
        created_date: date,
        edited_date: date,
        created_by: data.logged_in_user.user_id,
        edited_by: data.logged_in_user.user_id
    };
    
    var query = [];
    query.push(" INSERT INTO image set ?");
    query = query.join("");


    var mySqlQuery = connection.query(query,[queryData], function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("image add query = " + mySqlQuery.sql);
}

ImageDao.prototype.updateImage = function (data, cb) {
    logger.debug("image update image method call start (updateImage())");

    var date = utilDao.getMySqlFormatDateTime(null);
    var queryData = {
        path: data.relative_path,
        edited_date: date,
        edited_by: data.logged_in_user.user_id
    };
    
    var query = [];
    query.push(" UPDATE image set ? where id = ? ");
    query = query.join("");


    var mySqlQuery = connection.query(query,[queryData, data.id], function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("image update query = " + mySqlQuery.sql);
}

module.exports = ImageDao;