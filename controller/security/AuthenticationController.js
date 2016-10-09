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

/**
 * @api {get} /security/login Login API
 * @apiName Log In
 * @apiVersion 1.0.0
 * @apiGroup Authentication
 * @apiPermission appuser
 *
 * @apiDescription This API will login and returns JWT token. 
 *
 * @apiHeader {String} Content Type.
 *
 * @apiHeaderExample Header-Example:
 *     {
 *       "Content-Type" : application/json
 *     }
 * @apiParam {email}                email           User email id.
 * @apiParam {mobile_number}        mobile number   User mobile number.
 * @apiParam {password}             password        User password.
 * 
 * @apiParamExample {json} Request-Example:
 *     {
 *        "email":"easecare@gmail.com",
 *        "mobile_number": 9865784567,
 *        "passowrd": "*******"
 *    }
 * @apiExample Example usage:
 * curl -i http://baseurl/v1/security/login
 *
 * @apiSuccess {String}   token      The JWT Token.
 *
 * @apiError BAD_REQUEST Login credentials missing.
 * @apiError UNAUTHORIZED Invalid login credentials.
 *
 * @apiErrorExample Response (example):
 *     HTTP/1.1 401 Not Authenticated
 *     {
 *       "message": "UNAUTHORIZED"
 *     }
 */

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
app.post('/changepassword', function (req, res) {
    logger.info("Change password request received");
    authenticationService.changePassword(req.body, function (err, status, data) {
        return response(err, status, data, res);
    });
});
module.exports = app;

