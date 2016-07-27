"use strict";

var PORT = 3001;
var isPropGiven = false;

process.argv.forEach(function (val, index, array) {

	var arg = val.split("=");
	if (arg.length > 0) {
		if (arg[0] === 'prop') {
			
			var env = require('./env/' + arg[1] + '.json');
			exports.prop = env;
			exports.name = arg[1];
			
			exports.sessionsecret = env.sessionsecret;
			
			PORT = env.port;
			isPropGiven = true;
		}
	}
});

if(!isPropGiven){

	var env = require('./env/local.json');
	
	exports.prop = env;
	exports.name = 'local';
	exports.sessionsecret = env.sessionsecret;
	
	PORT = env.port;
}

