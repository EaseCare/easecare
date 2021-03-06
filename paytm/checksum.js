"use strict";

var crypt = require('./crypt');
var util = require('util');
var crypto = require('crypto');

//mandatory flag: when it set, only mandatory parameters are added to checksum

function paramsToString(params, mandatoryflag) {
  var data = '';
  var flag = params.refund ? true : false;
  delete params.refund;
  var tempKeys = Object.keys(params);
  if (!flag) tempKeys.sort();
  tempKeys.forEach(function (key) {
    if (key !== 'CHECKSUMHASH' ) {
      if (params[key] === 'null') params[key] = '';
      if (!mandatoryflag || mandatoryParams.indexOf(key) !== -1) {
        data += (params[key] + '|');
      }
    }
  });
  return data;
}


function genchecksum(params, key, cb) {
	var flag = params.refund ? true : false;
  var data = paramsToString(params);
	crypt.gen_salt(4, function (err, salt) {
    var sha256 = crypto.createHash('sha256').update(data + salt).digest('hex');
    console.log("sha256 is = "+sha256);
    var check_sum = sha256 + salt;
    console.log("check_sum is = "+check_sum);
    var encrypted = crypt.encrypt(check_sum, key);
    console.log("encrypted is = "+encrypted);
    if (flag) {
      params.CHECKSUM = (encrypted);
      params.CHECKSUM = encrypted;
    } else {
      params.CHECKSUMHASH = (encrypted);
      params.payt_STATUS = '1';
		}
    cb(undefined, params);
  });
}
function genchecksumbystring(params, key, cb) {

  crypt.gen_salt(4, function (err, salt) {
    var sha256 = crypto.createHash('sha256').update(params + '|' + salt).digest('hex');
    var check_sum = sha256 + salt;
    var encrypted = crypt.encrypt(check_sum, key);

     var CHECKSUMHASH = encodeURIComponent(encrypted);
     CHECKSUMHASH = encrypted;
    cb(undefined, CHECKSUMHASH);
  });
}


function verifychecksum(params, key) {

  if (!params) console.log("params are null");

  var data = paramsToString(params, false);
  //TODO: after PG fix on thier side remove below two lines
  console.log("params i got is"+JSON.stringify(params));
  if (params.CHECKSUMHASH) {
    params.CHECKSUMHASH = params.CHECKSUMHASH.replace('\n', '');
    params.CHECKSUMHASH = params.CHECKSUMHASH.replace('\r', '');

    var temp = decodeURIComponent(params.CHECKSUMHASH);
    
    var checksum = crypt.decrypt(temp, key);
    console.log("checksum is = "+checksum);
    var salt = checksum.substr(checksum.length - 4);
    console.log("salt is = "+salt);
    var sha256 = checksum.substr(0, checksum.length - 4);
    console.log("sha256 is = "+sha256);
    var hash = crypto.createHash('sha256').update(data + salt).digest('hex');
    console.log("hash is = "+hash);
    if (hash === sha256) {
      return true;
    } else {
      util.log("checksum is wrong");
      return false;
    }
  } else {
    util.log("checksum not found");
    return false;
  }
}

function verifychecksumbystring(params, key,checksumhash) {

    var checksum = crypt.decrypt(checksumhash, key);
    var salt = checksum.substr(checksum.length - 4);
    var sha256 = checksum.substr(0, checksum.length - 4);
    var hash = crypto.createHash('sha256').update(params + '|' + salt).digest('hex');
    if (hash === sha256) {
      return true;
    } else {
      util.log("checksum is wrong");
      return false;
    }
  } 

module.exports.genchecksum = genchecksum;
module.exports.verifychecksum = verifychecksum;
module.exports.verifychecksumbystring = verifychecksumbystring;
module.exports.genchecksumbystring = genchecksumbystring;
