"use strict";

var moduleName = __filename;
var logger = require('helper/Logger.js')(moduleName);
var config = require('config');
var responseCodes = config.responseCode;
var messages = config.messages;
var userDao = new (require('dao/admin/UserDao.js'))();
var utilService = new (require('service/util/UtilService.js'))();
var UserService = function () { };

/*********************************Get List Start************************************************/
UserService.prototype.getList = function (modal, cb) {
    logger.info("User get list service called (getList())");
    var self = this;

    userDao.getList(modal, function (err, entities) {
        if (err) {
            logger.error("Error in get user list (getList()) " + err);
            return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
        }

        return cb(null, responseCodes.SUCCESS, entities);
    });
};
/*********************************Get List End************************************************/


/*********************************Get Detail Start************************************************/
UserService.prototype.getDetail = function (data, cb) {
    logger.info("User get detail service called (getDetail())");
    var self = this;

    userDao.getDetail(data, function (err, entities) {
        if (err) {
            logger.error("Error in get user detail (getDetail()) " + err);
            return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
        }
        if(entities && entities.length>0){
            return cb(null, responseCodes.SUCCESS, entities[0]);
        }else{
            return cb(messages.userNotFound, responseCodes.NOT_FOUND);
        }
    });
};
/*********************************Get Detail End************************************************/


/*********************************Add Start************************************************/
UserService.prototype.add = function (data, cb) {
    logger.info("User add service called (add())");
    var self = this;
    var dob = data.date_of_birth;
    data.date_of_birth = utilService.formatDate(dob);
    userDao.add(data, function (err, addUserresult) {
        if (err) {
            logger.error("Error in add user (add()) " + err);
            return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
        }

        data.user_id =  addUserresult.insertId;
        userDao.addUserLogin(data, function (err, addUserLoginResult) {
            if (err) {
                logger.error("Error in add user login (add()) " + err);
                return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
            }

            var userDetailData = {
                id: addUserresult.insertId
            };
            logger.debug(" user detail data is (add())" + JSON.stringify(userDetailData));
            self.getDetail(userDetailData, function (err, code, getUserDetailResult) {
                return cb(err, code, getUserDetailResult);
            });
        });
    });
};
/*********************************Add End************************************************/

UserService.prototype.update = function (data, cb) {
    logger.info("User add service called (update())");
    var self = this;
    var dob = data.date_of_birth;
    data.date_of_birth = utilService.formatDate(dob);
    userDao.get(data, function (err, user) {
        if (err) {
            logger.error("Error in add user (update()) " + err);
            return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
        }
        if(user && user.length>0){
            if(user[0].address_id){
                var userId = data.id;
                data.id = user[0].address_id; 
                userDao.updateUserAddress(data,function(err, address_result){
                    if(err){
                        logger.error("Error in update user address (update()) " + err);
                        return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
                    }
                    data.id = userId;
                    userDao.updateUserLogin(data,function(err, user_login_result){
                       if(err){
                            logger.error("Error in update user login (update()) " + err);
                            return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
                        } 
                        userDao.update(data, function(err, user_result){
                            if(err){
                                logger.error("Error in update user (update()) " + err);
                                return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
                            } 
                           logger.debug(" user detail get in  (update())");
                            self.getDetail(userDetailData, function (err, code, getUserDetailResult) {
                                return cb(err, code, getUserDetailResult);
                            }); 
                        })
                    });
                });
            }else{
                userDao.addUserAddress(data,function(err, address_result){
                    if(err){
                        logger.error("Error in add user address (update()) " + err);
                        return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
                    }
                    data.address_id = address_result.insertId;
                    userDao.updateUserLogin(data,function(err, user_login_result){
                       if(err){
                            logger.error("Error in update user login (update()) " + err);
                            return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
                        } 
                        userDao.update(data, function(err, user_result){
                            if(err){
                                logger.error("Error in update user (update()) " + err);
                                return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
                            } 
                           logger.debug(" user detail get in  (update())");
                            self.getDetail(userDetailData, function (err, code, getUserDetailResult) {
                                return cb(err, code, getUserDetailResult);
                            }); 
                        })
                    });
                });
            }
        }else{
            return cb(messages.userNotFound,responseCodes.NOT_FOUND)
        }
    });
};
module.exports = UserService;
