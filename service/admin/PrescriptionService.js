"use strict";

var moduleName = __filename;
var logger = require('helper/Logger.js')(moduleName);
var config = require('config');
var responseCodes = config.responseCode;
var messages = config.messages;
var fileStorage = require("helper/FileUploader.js");
var fileUtil = require("helper/FileUtil.js");
var envProp = config.env.prop;
var prescriptionDao = new (require('dao/admin/PrescriptionDao.js'))();
var PrescriptionService = function () { };

/*********************************Get List Start************************************************/
PrescriptionService.prototype.getList = function (modal, cb) {
    logger.info("Category get list service called (getList())");
    prescriptionDao.getList(modal, function(err, result){
        if(err){
            logger.error("Error in get prescription list (getList())");
            return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
        }
        var finalResult = [];
        result.forEach(function(prescription){
            prescription.relative_path = modal.host + prescription.relative_path;
            finalResult.push(prescription);
        })
        return cb(null, responseCodes.SUCCESS, finalResult);
    })
    
};
/*********************************Get List End************************************************/

/*********************************Get Detail Start************************************************/
PrescriptionService.prototype.getDetail = function (modal, cb) {
    logger.info("Category get list service called (getList())");
    prescriptionDao.getDetail(modal, function(err, result){
        if(err){
            logger.error("Error in get prescription list (getList())");
            return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
        }
        if(result && result.length>0){
            var finalResult = [];
            result.forEach(function(prescription){
                prescription.relative_path = modal.host + prescription.relative_path;
                finalResult.push(prescription);
            })
            return cb(null, responseCodes.SUCCESS, finalResult[0]);
        }else{
            return cb(messages.prescriptionNotFound, responseCodes.NOT_FOUND);
        }
    })
    
};
/*********************************Get Detail End************************************************/

PrescriptionService.prototype.deletePrescription = function(modal, cb){
    logger.info("Delete prescription service called (deletePrescription())");
    prescriptionDao.deletePrescription(modal, function(err, result){
        if(err){
            logger.error("Error in get prescription list (getList())");
            return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
        }
        logger.info("the delete id is"+JSON.stringify(result));
        if(result.affectedRows > 0){
            return cb(null, responseCodes.SUCCESS, {message:messages.prescriptionDeleted});
        }
        return cb(messages.prescriptionNotFound, responseCodes.NOT_FOUND);
    })
}

PrescriptionService.prototype.addPrescription = function (req, res, cb) {
    logger.info("Add prescription service called (addPrescription())");
    var self = this;
    var data = req.data;
    data = req.body;
    var fileUpload = fileStorage.single('file');
    fileUpload(req, res, function (err) {
        if (err) {
            return cb(err,responseCodes.INTERNAL_SERVER_ERROR);
        }
        var logged_in_user = data.logged_in_user;
        data = req.body;
        data.logged_in_user = logged_in_user;
        var baseDir = envProp.reports.baseDir;
        if(req.fileName){
            fileUtil.makeDirIfNotExist(baseDir+req.data.logged_in_user.user_id,function(err,result){
            data.relative_path = baseDir+req.data.logged_in_user.user_id+"/"+req.fileName;
            
            prescriptionDao.addPrescription(data, function(err, result){
                if(err){
                    logger.error("Error in add prescription service (addPrescription())");
                    return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
                }
                data.id = result.insertId;
                data.host = req.headers.host;
                self.getList(data, function(err, status, result){
                    if(err){
                        return cb(err, status);
                    }
                    return cb(null, status, result[0]);
                });
            });  
            });
        }else{
            logger.info("File is not selected");
            return cb("No File selected "+responseCodes.INTERNAL_SERVER_ERROR);
        }
    }); 
};



module.exports = PrescriptionService;
