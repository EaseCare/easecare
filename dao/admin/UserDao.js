"use strict";

var moduleName = __filename;
var cache = require('service/cache').local;
var logger = require('helper/Logger.js')(moduleName);

var connection = require('service/mysql/Pool.js');

var UserDao = function () { }

UserDao.prototype.getList = function (data, cb) {
    logger.debug("user get list method call start");
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

UserDao.prototype.add = function (data, cb) {
    logger.debug("user add call start"+JSON.stringify(data.loggedInUser));
    
    var queryData = {
        first_name: data.first_name,
        last_name: data.last_name,
        age: data.age,
        gender: data.gender,
        created_by: data.loggedInUser.user_id
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

UserDao.prototype.addUserLogIn = function (data, cb) {
    logger.debug("user add logIn call start"+JSON.stringify(data.loggedInUser));
    
    var queryData = {
        user_id: data.first_name,
        email: data.email,
        mobile_number: data.mobile_number,
        password: data.password,
        created_by: data.loggedInUser.user_id
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
    logger.debug("query = " + mySqlQuery.sql);
}
module.exports = UserDao;