"use strict";

var app = require("express")();
var config = require('config');
var response = require('controller/ResponseController.js');
var moduleName = __filename;
var logger = require("helper/Logger.js")(moduleName);
var constants = config.orionConstants;
var messages = config.messages;
var responseCodes = config.responseCode;

var PrescriptionService = require('service/admin/PrescriptionService.js');
var prescriptionService = new PrescriptionService();


app.get('/', function (req, res) {
    logger.info("Get Prescription list request received");
    var data = req.data;
    data.host = req.headers.host;
    prescriptionService.getList(data, function (err, status, data) {
        return response(err, status, data, res);
    });
});
app.get('/:id', function (req, res) {
    logger.info("Get Prescription detail request received");
    var data = req.data;
    data.id = req.params.id;
    data.host = req.headers.host;
    prescriptionService.getDetail(data, function (err, status, data) {
        return response(err, status, data, res);
    });
});

app.post('/', function(req,res){
    logger.info("Add Prescription request received");
    prescriptionService.addPrescription(req, res, function(err, status, data){
        return response(err, status, data, res);
    })
});

app.delete('/:id', function(req,res){
    logger.info("Delete Prescription request received");
    var data = req.data;
    data.id = req.params.id;
    prescriptionService.deletePrescription(data, function(err, status, data){
        return response(err, status, data, res);
    })
});


module.exports = app;