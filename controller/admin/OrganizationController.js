"use strict";

var app = require("express")();
var config = require('config');
var response = require('controller/ResponseController.js');
var moduleName = __filename;
var logger = require("helper/Logger.js")(moduleName);
var constants = config.orionConstants;
var messages = config.messages;
var responseCodes = config.responseCode;

var OrganizationService = require('service/admin/OrganizationService.js');
var organizationService = new OrganizationService();


app.get('/', function (req, res) {
    logger.info("Get Organization  request received");
    organizationService.get(req.data, function (err, status, data) {
        return response(err, status, data, res);
    });
});



module.exports = app;