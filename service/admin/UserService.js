"use strict";

var moduleName = __filename;
var logger = require('helper/Logger.js')(moduleName);
var config = require('config');
var responseCodes = config.responseCode;
var messages = config.messages;
var fileStorage = require("helper/FileUploader.js");
var fileUtil = require("helper/FileUtil.js");
var smsGenerator = require("helper/SmsGenerator.js");
var guid = require('guid');
var userDao = new (require('dao/admin/UserDao.js'))();
var imageDao = new (require('dao/admin/ImageDao.js'))();
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
    var correlationId = guid.create();
    if(dob){
        data.date_of_birth = utilService.formatDate(dob);
    }
    userDao.add(data, function (err, addUserresult) {
        if (err) {
            logger.error("Error in add user (add()) " + err);
            return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
        }

        data.id =  addUserresult.insertId;
        data.otp = correlationId;
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
                //data.mobile_number
                smsGenerator.sendMessage(null,correlationId);
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
            var userId = data.id;
            self.createOrUpdateUserAddress(data, user[0], function(err, status, address_result_id){
                if(err){
                    logger.error("Error add or update user address (update())"+err);
                    return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
                }
                self.createOrUpdateUserImage(data, user[0], function(err, status, image_result_id){
                    if(err){
                        logger.error("Error add or update user image (update())"+err);
                        return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
                    }
                    data.id = userId;
                    data.address_id = address_result_id;
                    data.image_id = image_result_id;
                    self.createOrUpdateUserLogin(data,function(err, status, user_login_result){
                       if(err){
                            logger.error("Error in update user login (update()) " + err);
                            return cb(err, status);
                        } 
                        userDao.update(data, function(err, user_result){
                            if(err){
                                logger.error("Error in update user (update()) " + err);
                                return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
                            } 
                            logger.debug(" user detail get in  (update())");
                            self.getDetail(data, function (err, code, getUserDetailResult) {
                                return cb(err, code, getUserDetailResult);
                            }); 
                        });
                    });
                });
            });
        }else{
            return cb(messages.userNotFound,responseCodes.NOT_FOUND)
        }
    });
};
UserService.prototype.createOrUpdateUserAddress = function(data,user, cb){
    logger.info("Create Or Update user Address service called (createOrUpdateUserAddress())");
    var self = this;
    if(user.address_id){
        data.id = user.address_id; 
        userDao.updateUserAddress(data,function(err, address_result){
            if(err){
                logger.error("Error in update user address (createOrUpdateUserAddress()) " + err);
                return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
            }
            return cb(null, responseCodes.SUCCESS, user.address_id);
        });
    }else{
        userDao.addUserAddress(data,function(err, address_result){
            if(err){
                logger.error("Error in add user address (createOrUpdateUserAddress()) " + err);
                return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
            }
            return cb(null, responseCodes.SUCCESS, address_result.insertId);
        });
    }
}
UserService.prototype.createOrUpdateUserImage = function(data,user, cb){
    logger.info("Create Or Update user Image service called (createOrUpdateUserImage())");
    var self = this;
    if(data.relative_path){
        if(user.image_id){
            data.id = user.image_id; 
            imageDao.updateImage(data,function(err, image_result){
                if(err){
                    logger.error("Error in update user image (createOrUpdateUserImage()) " + err);
                    return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
                }
                return cb(null, responseCodes.SUCCESS, user.image_id);
            });
        }else{
            imageDao.addImage(data,function(err, image_result){
                if(err){
                    logger.error("Error in add user image (createOrUpdateUserImage()) " + err);
                    return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
                }
                console.log(image_result);
                return cb(null, responseCodes.SUCCESS, image_result.insertId);
            });
        }
    }else{
        return cb(null, responseCodes.SUCCESS, null);
    }
}
UserService.prototype.createOrUpdateUserLogin = function(data, cb){
    logger.info("Create Or Update user Image service called (createOrUpdateUserLogin())");
    userDao.updateUserLogin(data,function(err, login_result){
        if(err){
            logger.error("Error in update user image (createOrUpdateUserLogin()) " + err);
            return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
        }
        console.log(login_result);
        if(login_result.affectedRows > 0){
            return cb(null, responseCodes.SUCCESS, data.id);
        }else{
            userDao.addUserLogin(data,function(err, login_result){
                if(err){
                    logger.error("Error in add user image (createOrUpdateUserLogin()) " + err);
                    return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
                }
                console.log("2");
                console.log(login_result);
                return cb(null, responseCodes.SUCCESS, login_result.insertId);
            });
        }
    });
}
UserService.prototype.isUserExist = function(data, cb){
    logger.info("User service called (isUserExist())");
    var self = this;
    userDao.get(data, function (err, user) {
        if (err) {
            logger.error("Error in service user (isUserExist()) " + err);
            return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
        }
        if(user && user.length>0){
            logger.info("User found successfully (isUserExist())");
            return cb(null,responseCodes.SUCCESS, true)
        }
        else{
            logger.info("User not found successfully (isUserExist())");
            return cb(null,responseCodes.SUCCESS, false)
        }
    });
}
UserService.prototype.addLabReview = function(data, cb){
    logger.info("User add lab review service called (addLabReview())");
    userDao.addLabReview(data, function (err, user) {
        if (err) {
            logger.error("Error in service add user lab review (addLabReview()) " + err);
            return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
        }
        return cb(null, responseCodes.SUCCESS, {"message":messages.labReviewAdded})
    });
}
module.exports = UserService;
