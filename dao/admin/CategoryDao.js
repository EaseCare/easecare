"use strict";

var moduleName = __filename;
var cache = require('service/cache').local;
var logger = require('helper/Logger.js')(moduleName);

var connection = require('service/mysql/Pool.js');

var CategoryDao = function () { }

CategoryDao.prototype.getList = function (data, cb) {
    logger.debug("category get list method call start (getList())");
    var query = [];
    query.push(" SELECT * from category ");
    query = query.join("");


    var mySqlQuery = connection.query(query, function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("login query = " + mySqlQuery.sql);
}
CategoryDao.prototype.getDetail = function (data, cb) {
    logger.debug("category get detail method call start (getDetail()) ");
    var query = [];
    query.push(" SELECT u.id,u.first_name,u.last_name,u.age,u.gender ");
    query.push(" ,ul.email,ul.mobile_number,ul.password ");
    query.push(" FROM category as u ");
    query.push(" left outer join category_login as ul on ul.category_id = u.id ");
    query.push(" where u.id = ? ");
    query = query.join("");


    var mySqlQuery = connection.query(query,[data.id], function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("category detail query = " + mySqlQuery.sql);
}

CategoryDao.prototype.add = function (data, cb) {
    logger.debug("category add call start (add())");
    
    var queryData = {
        first_name: data.first_name,
        last_name: data.last_name,
        age: data.age,
        gender: data.gender,
        //created_by: data.loggedInCategory.category_id
    }
    var query = [];
    query.push(" insert into category set ? ");
    query = query.join("");


    var mySqlQuery = connection.query(query,[queryData], function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("query = " + mySqlQuery.sql);
}

CategoryDao.prototype.addCategoryLogin = function (data, cb) {
    logger.debug("category add logIn call start"+JSON.stringify(data));
    
    var queryData = {
        category_id: data.category_id,
        email: data.email,
        mobile_number: data.mobile_number,
        password: data.password,
       // created_by: data.loggedInCategory.category_id
    }
    var query = [];
    query.push(" insert into category_login set ? ");
    query = query.join("");


    var mySqlQuery = connection.query(query,[queryData], function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("query = " + mySqlQuery.sql);
}
module.exports = CategoryDao;