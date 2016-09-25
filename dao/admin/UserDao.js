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
UserDao.prototype.get = function (data, cb) {
    logger.debug("user get method call start (get())");
    var query = [];
    query.push(" select * from user where id = ? ");
    query = query.join("");


    var mySqlQuery = connection.query(query,[data.id], function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("uery = " + mySqlQuery.sql);
}
UserDao.prototype.getDetail = function (data, cb) {
    logger.debug("user get detail method call start (getDetail()) ");
    var query = [];
    query.push(" SELECT u.id,u.first_name,u.last_name,u.date_of_birth,u.gender ");
    query.push(" ,ul.email,ul.mobile_number,ul.password ");
    query.push(" ,a.address_line_1,a.address_line_2,a.landmark,a.city,a.state ");
    query.push(" FROM user as u ");
    query.push(" left outer join user_login as ul on ul.user_id = u.id ");
    query.push(" left outer join address as a on a.id = u.address_id ");
    query.push(" where u.id = ? ");
    query = query.join("");


    var mySqlQuery = connection.query(query, [data.id], function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("user detail query = " + mySqlQuery.sql + " " + data.id);
}

UserDao.prototype.add = function (data, cb) {
    logger.debug("user add call start (add())");
    var date = utilDao.getMySqlFormatDateTime(null);
    var queryData = {
        first_name: data.first_name,
        last_name: data.last_name,
        date_of_birth: data.date_of_birth,
        gender: data.gender,
        created_date: date,
        edited_date: date,
        created_by: data.logged_in_user.user_id,
        edited_by: data.logged_in_user.user_id
    }
    var query = [];
    query.push(" insert into user set ? ");
    query = query.join("");


    var mySqlQuery = connection.query(query, [queryData], function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("query = " + mySqlQuery.sql);
}
UserDao.prototype.update = function (data, cb) {
    logger.debug("user add call start (add())");
    var date = utilDao.getMySqlFormatDateTime(null);
    var queryData = {};
    if (data.first_name) {
        queryData.first_name = data.first_name;
    }
    if (data.last_name) {
        queryData.last_name = data.last_name;
    }
    if (data.date_of_birth) {
        queryData.date_of_birth = data.date_of_birth;
    }
    if (data.gender) {
        queryData.gender = data.gender;
    }
    queryData.edited_date = date;
    queryData.edited_by = data.logged_in_user.user_id;

    var query = [];
    query.push(" update user set ? where id = ?");
    query = query.join("");

    var mySqlQuery = connection.query(query, [queryData, data.id], function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("query = " + mySqlQuery.sql);
}

UserDao.prototype.addUserLogin = function (data, cb) {
    logger.debug("user add logIn call start" + JSON.stringify(data));
    var date = utilDao.getMySqlFormatDateTime(null);
    var queryData = {
        user_id: data.user_id,
        email: data.email,
        mobile_number: data.mobile_number,
        password: data.password,
        created_date: date,
        edited_date: date,
        created_by: data.logged_in_user.user_id,
        edited_by: data.logged_in_user.user_id
    }
    var query = [];
    query.push(" insert into user_login set ? ");
    query = query.join("");


    var mySqlQuery = connection.query(query, [queryData], function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("query = " + JSON.stringify(mySqlQuery));
}
UserDao.protottype.updateUserLogin = function (data, cb) {
    logger.debug("user update logIn call start" + JSON.stringify(data));
    var date = utilDao.getMySqlFormatDateTime(null);
    var queryData = {};
    if (data.mobile_number) {
        queryData.mobile_number = data.mobile_number;
    }
    queryData.edited_date = date;
    queryData.edited_by = data.logged_in_user.user_id;
    var query = [];
    query.push(" update user_login set ? where user_id = ?");
    query = query.join("");

    var mySqlQuery = connection.query(query, [queryData, data.id], function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("query = " + JSON.stringify(mySqlQuery));
}
UserDao.prototype.addUserAddress = function (data, cb) {
    logger.debug("user add addres call start" + JSON.stringify(data));
    var date = utilDao.getMySqlFormatDateTime(null);
    var queryData = {
        address_line_1: data.address_line_1,
        address_line_2: data.address_line_2,
        landmark: data.landmark,
        city: data.city,
        state: data.state,
        latitude: data.latitude,
        longitude: data.longitude,
        created_date: date,
        edited_date: date,
        created_by: data.logged_in_user.user_id,
        edited_by: data.logged_in_user.user_id
    }
    var query = [];
    query.push(" insert into address set ? ");
    query = query.join("");

    var mySqlQuery = connection.query(query, [queryData], function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("query = " + mySqlQuery);
}
UserDao.prototype.updateUserAddress = function (data, cb) {
    logger.debug("user update addres call start" + JSON.stringify(data));
    var date = utilDao.getMySqlFormatDateTime(null);
    var queryData = {};
    if (data.address_line_1) {
        queryData.address_line_1 = data.address_line_1;
    }
    if (data.address_line_1) {
        queryData.address_line_2 = data.address_line_2;
    }
    if (data.address_line_1) {
        queryData.landmark = data.landmark;
    }
    if (data.address_line_1) {
        queryData.city = data.city;
    }
    if (data.address_line_1) {
        queryData.state = data.state;
    }
    if (data.address_line_1) {
        queryData.latitude = data.latitude;
    }
    if (data.address_line_1) {
        queryData.longitude = data.longitude;
    }
    queryData.edited_date = date;
    queryData.edited_by = data.logged_in_user.user_id;
    var query = [];
    query.push(" update address set ? where id = ? ");
    query = query.join("");

    var mySqlQuery = connection.query(query, [queryData,data.id], function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("query = " + mySqlQuery);
}
module.exports = UserDao;