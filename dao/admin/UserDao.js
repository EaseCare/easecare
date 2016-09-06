"use strict";

var moduleName = __filename;
var cache = require('service/cache').local;
var logger = require('helper/Logger.js')(moduleName);

var connection = require('service/mysql/Pool.js');
var utilDao = require('dao/util/UtilDao.js');

var UserDao = function () { }

UserDao.prototype.getList = function (data, cb) {
    logger.debug("user get list method call start (getList())");
    var query = [];
    query.push(" select * from user ");
    query = query.join("");


    var mySqlQuery = connection.query(query, function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("login query = " + mySqlQuery.sql);
}
UserDao.prototype.getDetail = function (data, cb) {
    logger.debug("user get detail method call start (getDetail()) ");
    var query = [];
    query.push(" SELECT u.id,u.first_name,u.last_name,u.age,u.gender ");
    query.push(" ,ul.email,ul.mobile_number,ul.password ");
    query.push(" FROM user as u ");
    query.push(" left outer join user_login as ul on ul.user_id = u.id ");
    query.push(" where u.id = ? ");
    query = query.join("");


    var mySqlQuery = connection.query(query,[data.id], function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("user detail query = " + mySqlQuery.sql);
}

UserDao.prototype.add = function (data, cb) {
    logger.debug("user add call start (add())");
    var date = utilDao.getMySqlFormatDateTime(null);
    var queryData = {
        first_name: data.first_name,
        last_name: data.last_name,
        age: data.age,
        gender: data.gender,
        created_date:date,
        edited_date:date,
        created_by: data.logged_in_user.user_id,
        edited_by: data.logged_in_user.user_id
    }
    var query = [];
    query.push(" insert into user set ? ");
    query = query.join("");


    var mySqlQuery = connection.query(query,[queryData], function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("query = " + mySqlQuery.sql);
}

UserDao.prototype.addUserLogin = function (data, cb) {
    logger.debug("user add logIn call start"+JSON.stringify(data));
    var date = utilDao.getMySqlFormatDateTime(null);
    var queryData = {
        user_id: data.user_id,
        email: data.email,
        mobile_number: data.mobile_number,
        password: data.password,
        created_date:date,
        edited_date:date,
        created_by: data.logged_in_user.user_id,
        edited_by: data.logged_in_user.user_id
    }
    var query = [];
    query.push(" insert into user_login set ? ");
    query = query.join("");


    var mySqlQuery = connection.query(query,[queryData], function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("query = " + JSON.stringify(mySqlQuery));
}
module.exports = UserDao;