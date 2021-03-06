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
    query.push(" SELECT u.id,u.full_name,u.date_of_birth,u.gender ");
    query.push(" ,ul.email,ul.mobile_number ");
    query.push(" ,a.address_line_1,a.address_line_2,a.landmark,a.city,a.state ");
    query.push(" ,i.path as image_path ")
    query.push(" FROM user as u ");
    query.push(" left outer join user_login as ul on ul.user_id = u.id ");
    query.push(" left outer join address as a on a.id = u.address_id ");
    query.push(" left outer join image as i on i.id = u.image_id ");
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
    logger.debug("user add call start (add())"+JSON.stringify(data));
    var date = utilDao.getMySqlFormatDateTime(null);
    var queryData = {
        full_name: data.full_name,
        date_of_birth: data.date_of_birth,
        gender: data.gender,
        created_date: date,
        edited_date: date
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
    if (data.full_name) {
        queryData.full_name = data.full_name;
    }
    if (data.date_of_birth) {
        queryData.date_of_birth = data.date_of_birth;
    }
    if (data.gender) {
        queryData.gender = data.gender;
    }
    if(data.image_id){
        queryData.image_id = data.image_id;
    }
    if(data.address_id){
        queryData.address_id = data.address_id;
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
    var createdId = data.id;
    var editedId = data.id;
    if(data.logged_in_user){
        createdId = data.logged_in_user.user_id;
        editedId = data.logged_in_user.user_id;
    }
    var date = utilDao.getMySqlFormatDateTime(null);
    var queryData = {
        user_id: data.id,
        email: data.email,
        mobile_number: data.mobile_number,
        password: data.password,
        otp: data.otp,
        is_facebook:data.is_facebook || 0,
        active:0,
        created_date: date,
        edited_date: date,
        created_by: createdId,
        edited_by: editedId
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
UserDao.prototype.updateUserLogin = function (data, cb) {
    logger.debug("user update logIn call start" + JSON.stringify(data));
    var date = utilDao.getMySqlFormatDateTime(null);
    var queryData = {};
    if (data.mobile_number) {
        queryData.mobile_number = data.mobile_number;
    }
    if (data.email) {
        queryData.email = data.email;
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
    logger.debug("query = " + mySqlQuery.sql);
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
UserDao.prototype.addLabReview = function (data, cb) {
    logger.debug("user add lab review call start (addLabReview())"+JSON.stringify(data));
    var date = utilDao.getMySqlFormatDateTime(null);
    var queryData = {
        user_id: data.logged_in_user.user_id,
        lab_id: data.lab_id,
        rating: data.rating,
        review: data.review,
        created_date: date,
        edited_date: date,
        edited_by: data.logged_in_user.user_id,
        created_by: data.logged_in_user.user_id
    }
    var updateData = {
        edited_date: date,
        edited_by: data.logged_in_user.user_id,
    }
    if(data.rating){
        updateData.rating = data.rating;
    }
    if(data.review){
        updateData.review = data.review;
    }
    var query = [];
    query.push(" insert into user_rating set ? on duplicate key update ? ");
    query = query.join("");


    var mySqlQuery = connection.query(query, [queryData, updateData], function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("query = " + mySqlQuery.sql);
}
module.exports = UserDao;