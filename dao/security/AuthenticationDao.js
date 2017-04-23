"use strict";

var moduleName = __filename;
var cache = require('service/cache').local;
var logger = require('helper/Logger.js')(moduleName);

var connection = require('service/mysql/Pool.js');

var AuthenticationDao = function () { }

AuthenticationDao.prototype.fbLogIn = function(data, cb) {
    logger.debug("fbLogIn dao method call start"+JSON.stringify(data));
    
    var query = [];
    query.push("select * from user_login where email = ? AND is_facebook=1");
    query = query.join("");
    
    var mySqlQuery = connection.query(query, [data.email], function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("login query = "+mySqlQuery.sql);
}
AuthenticationDao.prototype.logIn = function(data, cb) {
    logger.debug("login dao method call start"+JSON.stringify(data));
    
    var identifier = null;
    if(data.email){
        identifier= data.email;
    }else if(data.mobileNumber){
        identifier = data.mobileNumber;
    }
    
    var query = [];
    query.push("select * from user_login where password = ? ");
    if(data.email){
        query.push(" and email = ? ");
    }else if(data.mobileNumber){
        query.push(" and mobile_number = ? ");
    }
    query = query.join("");
    
    
    var mySqlQuery = connection.query(query, [data.password,identifier], function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("login query = "+mySqlQuery.sql);
}
AuthenticationDao.prototype.isValidPassword =  function(data, cb) {
    logger.debug("isValidPassword dao method call start");
 
    var query = [];
    query.push(" select * from user_login where user_id = ? and password = ? ");
    query = query.join("");
    
    var mySqlQuery = connection.query(query, [data.id,data.password], function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("isValidPassword query = "+mySqlQuery.sql);
}
AuthenticationDao.prototype.changePassword =  function(data, cb) {
    logger.debug("changePassword dao method call start");
    
    var queryData = {password:data.new_password};
    var query = [];
    query.push(" update user_login set ? where user_id = ? and password = ? ");
    query = query.join("");
    
    var mySqlQuery = connection.query(query, [queryData, data.id, data.password], function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("isValidPassword query = "+mySqlQuery.sql);
}
AuthenticationDao.prototype.enableUser =  function(data, cb) {
    logger.debug("enableUser dao method call start");
    
    var queryData = {active:1};
    var query = [];
    query.push(" update user_login set ? where otp = ? ");
    query = query.join("");
    
    var mySqlQuery = connection.query(query, [queryData, data.otp], function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("enableUser query = "+mySqlQuery.sql);
}
AuthenticationDao.prototype.setTempPassword =  function(data, cb) {
    logger.debug("setTempPassword dao method call start");
    
    var queryData = {password:data.new_password};
    var query = [];
    query.push(" update user_login set ? where email = ? ");
    query = query.join("");
    
    var mySqlQuery = connection.query(query, [queryData, data.email], function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("isValidPassword query = "+mySqlQuery.sql);
}
AuthenticationDao.prototype.checkEmail =  function(data, cb) {
    logger.debug("changePassword dao method call start");
    
    var query = [];
    query.push(" select * from user_login  where email = ? ");
    query = query.join("");
    
    var mySqlQuery = connection.query(query, [data.email], function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("check email query = "+mySqlQuery.sql);
}
module.exports = AuthenticationDao;