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

module.exports = UtilService;
    
  
