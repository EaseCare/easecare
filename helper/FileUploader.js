
var mkdirp = require("mkdirp");
var fs = require("fs");
var multer  = require('multer');

var config = require("config");

var env = config.env;
var uploadFileDirectory = env.prop["uploaded-temp-path"];

mkdirp.sync(uploadFileDirectory);

var storage = multer.diskStorage({
	destination : function(req, file, cb){
        var userDir = __dirname.split("helper")[0];
        userDir = userDir+uploadFileDirectory+req.data.logged_in_user.user_id+"/";    
        if (!fs.existsSync(userDir)){
            fs.mkdirSync(userDir);
        }
        req.fileDir = userDir;
        return cb(null, userDir);
	},filename : function(req, file, cb){
        console.log("file"+JSON.stringify(file));
        var fileName = Date.now()+"_"+file.originalname;
        req.fileName = fileName;
		return cb(null, fileName);
	}
});

var upload = multer({storage : storage});

module.exports = upload;