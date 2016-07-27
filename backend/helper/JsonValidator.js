"use strict";

var jsonValidate = require('express-jsonschema');
var jsonschema = require('jsonschema');

var dateREGEX = /^([1-9]|0[1-9]|1[0-2])\/([1-9]|0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
var booleanREGEX = /^('?|"?)(true|false|1|0)('?|"?)$/
jsonValidate.addSchemaProperties({

	is : function(instance, schema, options, ctx){
		if(!schema.required && instance === undefined){
			return;
		}
		switch(schema.is){
			case 'numeric':
				if(/^('?|"?)\d+('?|"?)$/.test(instance)){
					return;
				}else{
					return "is not type numeric string";
				}
			case 'date':
				if(dateREGEX.test(instance)){
					return;
				}else{
					return "is not type date in specified format";
				}
			case 'boolean': 
				if(booleanREGEX.test(instance)){
					return;
				}else{
					return "is not type date in specified format";
				}
			default: 
				return "Developers mistake";
		}
	}

});

module.exports = jsonValidate.validate;
