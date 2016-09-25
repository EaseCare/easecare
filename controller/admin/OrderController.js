"use strict";

var app = require("express")();
var config = require('config');
var response = require('controller/ResponseController.js');
var moduleName = __filename;
var logger = require("helper/Logger.js")(moduleName);
var constants = config.orionConstants;
var messages = config.messages;
var responseCodes = config.responseCode;

var OrderService = require('service/admin/OrderService.js');
var orderService = new OrderService();


app.post('/', function (req, res) {
    logger.info("Get Category list request received");
    orderService.add(req.body, function (err, status, data) {
        return response(err, status, data, res);
    });
});



module.exports = app;