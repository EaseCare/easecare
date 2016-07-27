"use strict";

var moduleName = __filename;
var prop = require('config').env.prop;
var logger = require("helper/Logger.js")(moduleName);

exports.morganOptions = {
    format: prop.orion["req-logger"],
    options: {
        stream: {
            write: function (str) { logger.debug("the request log"+str); }
        }//accessLogStream
    }

};

