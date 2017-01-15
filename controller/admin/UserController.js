"use strict";

var app = require("express")();
var util = require('util');
var config = require('config');
var sharedCache = require('service/cache').shared;
var middlewareLogin = require('middleware/LoginMiddleware.js');
var fileStorage = require("helper/FileUploader.js");
var envProp = config.env.prop;
var response = require('controller/ResponseController.js');
var moduleName = __filename;
var logger = require("helper/Logger.js")(moduleName);
var constants = config.orionConstants;
var messages = config.messages;
var responseCodes = config.responseCode;

var UserService = require('service/admin/UserService.js');
var userService = new UserService();
var emailService = require('service/mail/EmailService.js');


app.get('/', function (req, res) {
    logger.info("Get User list request received");
    userService.getList(req.data, function (err, status, data) {
        return response(err, status, data, res);
    });
});

app.get('/mail',function(req,res){
    emailService.sendMail("register",{email:"s.karambeer@gmail.com",subject:"Hello ✔"},function(err,status,data){
        return response(err,status,data,res);
    })
})

app.post('/', function (req, res) {
    logger.info("Add User request received");
    userService.add(req.data, function (err, status, data) {
        return response(err, status, data, res);
    });
});

app.get('/:id', function (req, res) {
    logger.info("Get User detail request received");
    var data = req.data;
    data.id = req.params.id;
    userService.getDetail(data, function (err, status, data) {
        return response(err, status, data, res);
    });
});

app.put('/:id', function (req, res) {
    logger.info("Update User detail request received");
    var data = req.data;
    data = req.body;
    var fileUpload = fileStorage.single('profile');
    fileUpload(req, res, function (err) {
        if (err) {
            return cb(err,responseCodes.INTERNAL_SERVER_ERROR);
        }
        var logged_in_user = data.logged_in_user;
        data = req.body;
        data.logged_in_user = logged_in_user;
        var baseDir = envProp.reports.baseDir;
        if(req.fileName){
            data.relative_path = baseDir+req.data.logged_in_user.user_id+"/"+req.fileName;
        }
        data.id = req.params.id;
        userService.update(data, function (err, status, data) {
            data.image_path = req.headers.host + data.image_path;
            return response(err, status, data, res);
        });
    });
});

module.exports = app;