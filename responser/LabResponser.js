"use strict";

var moduleName = __filename;
var logger = require('helper/Logger.js')(moduleName);
var config = require('config');
var responseCodes = config.responseCode;
var messages = config.messages;

var LabResponser = function () { };

LabResponser.prototype.getListResponse = function (lab_list, cb) {
    
    
}

module.exports = LabService;