"use strict";

var utilDao = require('dao/util/UtilDao.js');

var UtilService = function() {};


UtilService.prototype.getNextSeqId = function (data, cb) {
    utilDao.getNextSeqId(data, function (err, fetched) {
        if (err) {
            return cb(err);
        }
        return cb(null, fetched);
    });
};

UtilService.prototype.storeNextSeqId = function (data, cb) {
    utilDao.storeNextSeqId(data, function (err, added) {
        if (err) {
            return cb(err);
        }
        return cb(null, added);
    });
};

UtilService.prototype.getAndStoreNextSeqId = function (data, cb) {
    var thisService = this;
    thisService.getNextSeqId(data, function (err, sequence) {
        if (err) {
            return cb(err);
        }
        if (sequence && sequence.length > 0) {
            data.seqId = Number(sequence[0].seqId) + 1;
            data.prevSeqId = sequence[0].seqId;
            utilDao.updateNextSeqId(data, function (err, stored) {
                if (err) {
                    return cb(err);
                }
                return cb(null, data.seqId);
            });
        } else {
            data.seqId = 1;
            thisService.storeNextSeqId(data, function (err, stored) {
                if (err) {
                    return cb(err);
                }
                return cb(null, data.seqId);
            });
        }

    });
};

UtilService.prototype.isJson = function (str) {
    //var str  = JSON.stringify(data);
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};
UtilService.prototype.formatDate = function (str) {
    if(str){
        var dateArray = str.split("/");
        return dateArray[2]+"-"+dateArray[1]+"-"+dateArray[0];
    }else{
        return null;
    }
};
UtilService.prototype.formatDateTime = function (str) {
    if(str){
        var dateTimeArray = str.split(" ");
        return this.formatDate(dateTimeArray[0])+" "+dateTimeArray[1];
    }else{
        return null;
    }
};
UtilService.prototype.getDuplicate = function(inputArray, cb){
    var out_map = {};
    inputArray.forEach(function(value){
        if(value in out_map){
            var temp = out_map[value];
            out_map[value] = temp + 1;
        }else{
            out_map[value] = 1;
        }
    });
    var keys = Object.keys(out_map);
    return cb(keys, out_map);
}
module.exports = UtilService;
    
  
