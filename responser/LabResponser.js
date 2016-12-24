"use strict";

var moduleName = __filename;
var logger = require('helper/Logger.js')(moduleName);
var config = require('config');
var responseCodes = config.responseCode;
var messages = config.messages;

var LabResponser = function () { };

LabResponser.prototype.getListForTestResponse = function (lab_test_list,out_map) {
    var self = this;
    var responseList = [];
    lab_test_list.forEach(function(lab_test){
        var response = {};
        var test_ids = (lab_test.test_ids).split(",");
        var test_names = (lab_test.test_name).split(",");
        var test_prices = (lab_test.test_price).split(",");
        self.MapObjects(test_ids, test_names, test_prices, out_map, function(tests, total_price){
           response.id = lab_test.id;
            response.name = lab_test.name;
            response.lab_image = lab_test.lab_image;
            response.address_line_1 = lab_test.address_line_1;
            response.address_line_2 = lab_test.address_line_2;
            response.landmark = lab_test.landmark;
            response.city = lab_test.city;
            response.state = lab_test.state;
            response.latitude = lab_test.latitude;
            response.longitude = lab_test.longitude
            response.tests = tests;
            response.total_price = total_price;
            responseList.push(response); 
        });
    })
    return responseList;
    
}
LabResponser.prototype.MapObjects = function(array1, array2, array3, out_map, cb){
    var length = 0;
    var tests = [];
    var total_price = 0;
    if(array1.length < array2.length){
        if(array1.length <array3.length){
            length = array1.length;
        }else{
            length = array3.length;
        }
    }else if(array2.length < array3.length){
        length = array2.length;
    }else{
        length = array3.length;
    }
    for(var i=0; i<length; i++){
        var test = {};
        test.id = Number(array1[i]);
        test.name = array2[i];
        test.price = Number(array3[i]);
        test.quantity = out_map[test.id];
        total_price = total_price + (test.price * test.quantity);
        tests.push(test);
    }
    return cb(tests, total_price);
}
module.exports = LabResponser;