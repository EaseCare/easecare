"use strict";

var moduleName = __filename;
var cache = require('service/cache').local;
var logger = require('helper/Logger.js')(moduleName);

var connection = require('service/mysql/Pool.js');

var LabDao = function () { }

LabDao.prototype.getList = function (data, cb) {
    logger.debug("lab get list method call start (getList())");
    var query = [];
    query.push(" SELECT l.id,l.name,lt.price,i.path as lab_image ");
    query.push(" ,t.id as test_id,t.name as test_name ");
    query.push(" ,a.address_line_1,a.address_line_2,a.city,a.state,a.latitude,a.longitude ");
    query.push(" ,SUM(ur.rating)/COUNT(ur.rating) as average_rating,ur.review,ur.created_date ");
    query.push(" ,u.id as user_id,u.first_name,u.last_name,u.image_id,iu.path as user_image ");
    query.push(" FROM test as t ");
    query.push(" LEFT JOIN lab_test as lt on lt.test_id = t.id ");
    query.push(" LEFT JOIN lab as l on l.id = lt.lab_id ");
    query.push(" LEFT JOIN address as a on a.id = l.address_id ");
    query.push(" LEFT JOIN user_rating as ur on ur.lab_id = l.id ");
    query.push(" LEFT JOIN image as i on i.id = l.image_id ");
    query.push(" LEFT JOIN user as u on u.id = ur.user_id ");
    query.push(" LEFT JOIN image as iu on iu.id = u.image_id ");

    if (data.test_id) {
        query.push(" where t.id = ? ");
    }
    query.push(" GROUP BY l.id ");
    query = query.join("");


    var mySqlQuery = connection.query(query, [data.test_id], function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("login query = " + mySqlQuery.sql);
}
LabDao.prototype.getDetail = function (data, cb) {
    logger.debug("lab get detail method call start (getDetail()) ");
    var query = [];
    query.push(" SELECT u.id,u.first_name,u.last_name,u.age,u.gender ");
    query.push(" ,ul.email,ul.mobile_number,ul.password ");
    query.push(" FROM lab as u ");
    query.push(" left outer join lab_login as ul on ul.lab_id = u.id ");
    query.push(" where u.id = ? ");
    query = query.join("");


    var mySqlQuery = connection.query(query, [data.id], function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("lab detail query = " + mySqlQuery.sql);
}

LabDao.prototype.add = function (data, cb) {
    logger.debug("lab add call start (add())");

    var queryData = {
        first_name: data.first_name,
        last_name: data.last_name,
        age: data.age,
        gender: data.gender,
        //created_by: data.loggedInLab.lab_id
    }
    var query = [];
    query.push(" insert into lab set ? ");
    query = query.join("");


    var mySqlQuery = connection.query(query, [queryData], function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("query = " + mySqlQuery.sql);
}

LabDao.prototype.addLabLogin = function (data, cb) {
    logger.debug("lab add logIn call start" + JSON.stringify(data));

    var queryData = {
        lab_id: data.lab_id,
        email: data.email,
        mobile_number: data.mobile_number,
        password: data.password,
        // created_by: data.loggedInLab.lab_id
    }
    var query = [];
    query.push(" insert into lab_login set ? ");
    query = query.join("");


    var mySqlQuery = connection.query(query, [queryData], function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("query = " + mySqlQuery.sql);
}
module.exports = LabDao;