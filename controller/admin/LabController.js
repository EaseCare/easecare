"use strict";

var app = require("express")();
var config = require('config');
var response = require('controller/ResponseController.js');
var moduleName = __filename;
var logger = require("helper/Logger.js")(moduleName);
var constants = config.orionConstants;
var messages = config.messages;
var responseCodes = config.responseCode;

var LabService = require('service/admin/LabService.js');
var labService = new LabService();


app.get('/', function (req, res) {
    logger.info("Get Lab list request received");
    var data = req.body;
    data.test_id = req.query.test_id;
    labService.getList(data, function (err, status, data) {
        return response(err, status, data, res);
    });
});

app.post('/', function (req, res) {
    logger.info("Add Lab request received");
    labService.add(req.body, function (err, status, data) {
        return response(err, status, data, res);
    });
});

app.get('/:id', function (req, res) {
    logger.info("Get Lab detail request received");
    var data = req.body;
    data.id = req.query.id;
    data.test_id = req.query.test_id;
    labService.getDetail(req.body, function (err, status, data) {
        return response(err, status, data, res);
    });
});

module.exports = app;