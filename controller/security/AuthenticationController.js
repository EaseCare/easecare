"use strict";

var app = require("express")();
var config = require('config');
var sharedCache = require('service/cache').shared;

var moduleName = __filename;
var logger = require("helper/Logger.js")(moduleName);

var response = require('controller/ResponseController.js');

var AuthenticationService = require('service/security/AuthenticationService.js');
var UserService = require('service/admin/UserService.js');

var authenticationService = new AuthenticationService();
var userService = new UserService();


app.post('/login', function (req, res) {
    logger.info("Login request received"+req.body);
    authenticationService.logIn(req.body, function (err, status, data) {
        return response(err, status, data, res);
    });
});

app.post('/signup', function (req, res) {
    logger.info("Add User login request received");
    userService.add(req.body, function (err, status, data) {
        return response(err, status, data, res);
    });
});
module.exports = app;

