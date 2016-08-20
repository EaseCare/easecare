"use strict";

var app = require("express")();
var config = require('config');
var response = require('controller/ResponseController.js');
var moduleName = __filename;
var logger = require("helper/Logger.js")(moduleName);
var constants = config.orionConstants;
var messages = config.messages;
var responseCodes = config.responseCode;

var TestService = require('service/admin/TestService.js');
var testService = new TestService();


app.get('/', function (req, res) {
    logger.info("Get Test list request received");
    var data = req.body;
    data.category_id = req.query.category_id;
    testService.getList(data, function (err, status, data) {
        return response(err, status, data, res);
    });
});

app.post('/', function (req, res) {
    logger.info("Add Test request received");
    testService.add(req.body, function (err, status, data) {
        return response(err, status, data, res);
    });
});

app.get('/:id', function (req, res) {
    logger.info("Get Test detail request received");
    testService.getDetail(req.body, function (err, status, data) {
        return response(err, status, data, res);
    });
});

module.exports = app;