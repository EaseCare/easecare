"use strict";

var app = require("express")();
var util = require('util');
var config = require('config');
var sharedCache = require('service/cache').shared;
var middlewareLogin = require('middleware/LoginMiddleware.js');
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
    userService.getList(req.body, function (err, status, data) {
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
    userService.add(req.body, function (err, status, data) {
        return response(err, status, data, res);
    });
});

app.get('/:id', function (req, res) {
    logger.info("Get User detail request received");
    userService.getDetail(req.body, function (err, status, data) {
        return response(err, status, data, res);
    });
});

module.exports = app;